import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  public showSnackbar(statut: string) : void {
    var snackbar = document.getElementById("snackbar");
    console.log('alooo', snackbar);
    if (snackbar) {
      console.log('snackbar', snackbar);
      if (statut === 'success') {
        this.message = 'Stock mis à jour avec succès';
        snackbar.style.display = "block";
      setTimeout(() => {
          snackbar!.style.display = "none";
      }, 3000);
    } else {
      this.message = 'Erreur lors de la mise à jour du stock';
      snackbar.style.display = "block";
      setTimeout(() => {
        snackbar!.style.display = "none";
      }, 3000);
    }
  }
}

public closeSnackbar() : void {
  var snackbar = document.getElementById("snackbar");
    snackbar!.style.display = "none";
  }
}
