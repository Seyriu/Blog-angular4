import { Component, OnInit, ViewChild } from '@angular/core';
import { Utente } from '../models/utente.model';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { FilesService } from '../services/files.service';
import { UtilitiesService } from '../services/utilities.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  utente: Utente;
  files: FileList;
  serverPath: string = ConstantsService.SERVER_PATH;
  @ViewChild('profilePicture') profilePicture;

  constructor(private login: UtenteAndLoginService,
              public utilities: UtilitiesService,
              private fileService: FilesService) {
  }

  ngOnInit() {
    this.utente = this.login.utente;

    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
    });
  }

  selectFile(event) {
    this.files = this.profilePicture.nativeElement.files;
  }

  uploadProfilePic() {
    if (this.files.length === 0) {
      return;
    };

    const formData = new FormData();
    formData.append('profilePicture', this.files[0]);

    this.fileService.uploadProfilePic(formData).subscribe(
      (response: Response) => {
        this.login.loadUser(this.utente.id, this.login.jwt).subscribe((utente: Utente) => {
          this.utente = utente;
          this.login.utente = utente;
        });
      });
  }

  clearFile() {
    this.profilePicture.setValue(null);
    this.files = null;
  }
}
