import { Component, Input } from '@angular/core';
import { Article } from '../../models/Article';
import { ModalComponent } from '../../shared/modal/modal.component';
import { StockServiceService } from '../../services/stock-service.service';
import { MiseAJourStock } from '../../models/MiseAJourStock';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() article!: Article;

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  modalType: 'entrée' | 'sortie' = 'entrée';

  constructor(private stockService : StockServiceService) {}

  openModal(type: 'entrée' | 'sortie') {
    this.modalType = type;
    this.modalTitle = type === 'entrée' ? 'Ajouter au stock' : 'Retirer du stock';
    this.modalContent = `Vous allez ${type === 'entrée' ? 'ajouter' : 'retirer'} du stock pour l'article ${this.article.nom}.`;
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmAction(quantity: number) {
    this.closeModal();
    const payload: MiseAJourStock = {
      articleId: this.article.id,
      quantite: quantity
    };

    console.log('Payload', payload);
    if (this.modalType === 'entrée') {
      this.stockService.addStock(payload).subscribe({
        next: (data) => {
          console.log('Stock mis à jour avec succès', data);
          this.article.quantite_stock = this.article.quantite_stock + quantity
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du stock', error);
        }
      });
    } else if (this.modalType === 'sortie') {
      this.stockService.removeStock(payload).subscribe({
        next: (data) => {
          console.log('Stock mis à jour avec succès', data);
          this.article.quantite_stock = this.article.quantite_stock - quantity;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du stock', error);
        }
      });
    }
  }
}
