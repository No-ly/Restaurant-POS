import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  // Información de contacto
  contacto = {
    telefono: '+52 55 1234 5678',
    email: 'soporte@restaurantepos.com',
    direccion: 'Av. Principal 123, CDMX'
  };

  // Redes sociales
  redesSociales = [
    {
      icon: 'fab fa-whatsapp',
      nombre: 'WhatsApp',
      url: 'https://wa.me/525512345678',
      color: '#25D366'
    },
    {
      icon: 'fab fa-facebook',
      nombre: 'Facebook',
      url: 'https://facebook.com/restaurantepos',
      color: '#1877F2'
    },
    {
      icon: 'fab fa-instagram',
      nombre: 'Instagram',
      url: 'https://instagram.com/restaurantepos',
      color: '#E4405F'
    },
    {
      icon: 'fas fa-envelope',
      nombre: 'Email',
      url: 'mailto:soporte@restaurantepos.com',
      color: '#EA4335'
    }
  ];

  // Enlaces rápidos
  enlacesRapidos = [
    { nombre: 'Soporte Técnico', ruta: '/soporte' },
    { nombre: 'Manual de Usuario', ruta: '/manual' },
    { nombre: 'Política de Privacidad', ruta: '/privacidad' },
    { nombre: 'Términos de Servicio', ruta: '/terminos' }
  ];

  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }
}
