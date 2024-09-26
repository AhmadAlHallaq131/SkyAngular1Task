import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../highlight.pipe';

interface VacationRequest {
  name: string;
  image: string;
  submittedDate: string;
  duration: string;
  salary: string;
}

@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightPipe],
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent {
  searchInput: string = '';
  requests: VacationRequest[] = [];
  filteredRequests: VacationRequest[] = [];
  paginatedRequests: VacationRequest[] = [];
  currentPage = 1;
  pageSize = 9;
  totalPages: number = 0;
  pages: number[] = [];
  names: string[] = ["Ali", "omer", "mohammad", "Ahmad", "Fatima","albrens", "abdo", "lolo"];

  constructor() {
    this.generateRequests();
  }

  navigateToNav(page: string) {
    window.location.href = `./${page}`;
  }

  generateRequests() {
    const randomIndex = () => Math.floor(Math.random() * this.names.length);
    //const randomsal = () => Math.floor(Math.random() * this.names.length);
    this.requests = Array.from({ length: 23 }, () => ({
      name: this.names[randomIndex()] + " " + this.names[randomIndex()],
      image: 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid',
      submittedDate: '1/3/2024',
      duration: '2 Weeks (1/4/2023 - 14/4/2023)',
      salary: '1000 AED'
    }));
    this.updateFilteredRequests();
  }

  updateFilteredRequests(): void {
    this.filteredRequests = this.requests.filter(request =>
      request.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredRequests.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
    this.updatePaginatedRequests();
  }

  updatePaginatedRequests(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRequests = this.filteredRequests.slice(start, end);
  }

  onSearchInputChange(): void {
    this.updateFilteredRequests();
  }

  navigateTo(pageNumber: number, event: Event): void {
    event.preventDefault();
    this.currentPage = pageNumber;
    this.updatePaginatedRequests();
  }

  navigateToPrevious(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRequests();
    }
  }

  navigateToNext(event: Event): void {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRequests();
    }
  }
}