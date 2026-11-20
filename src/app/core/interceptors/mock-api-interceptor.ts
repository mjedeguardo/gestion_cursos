import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MockApiService } from '../services/mock-api';
import { map } from 'rxjs/operators';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const mockApi = inject(MockApiService);

  if (req.url.includes('api/')) {
    
    // --- USUARIOS ---
    if (req.url.includes('usuarios') && req.method === 'GET') return mockApi.getUsuarios().pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.includes('usuarios') && req.method === 'POST') return mockApi.addUsuario(req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/usuarios\/\d+$/) && req.method === 'PUT') return mockApi.updateUsuario(Number(req.url.split('/').pop()), req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/usuarios\/\d+$/) && req.method === 'DELETE') return mockApi.deleteUsuario(Number(req.url.split('/').pop())).pipe(map(data => new HttpResponse({ status: 200, body: data })));

    // --- ALUMNOS ---
    if (req.url.includes('alumnos') && req.method === 'GET') return mockApi.getAlumnos().pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.includes('alumnos') && req.method === 'POST') return mockApi.addAlumno(req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/alumnos\/\d+$/) && req.method === 'PUT') return mockApi.updateAlumno(Number(req.url.split('/').pop()), req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/alumnos\/\d+$/) && req.method === 'DELETE') return mockApi.deleteAlumno(Number(req.url.split('/').pop())).pipe(map(data => new HttpResponse({ status: 200, body: data })));

    // --- CURSOS ---
    if (req.url.includes('cursos') && req.method === 'GET') return mockApi.getCursos().pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.includes('cursos') && req.method === 'POST') return mockApi.addCurso(req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/cursos\/\d+$/) && req.method === 'PUT') return mockApi.updateCurso(Number(req.url.split('/').pop()), req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/cursos\/\d+$/) && req.method === 'DELETE') return mockApi.deleteCurso(Number(req.url.split('/').pop())).pipe(map(data => new HttpResponse({ status: 200, body: data })));

    // --- NOTAS ---
    if (req.url.includes('notas') && req.method === 'GET') return mockApi.getNotas().pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.includes('notas') && req.method === 'POST') return mockApi.addNota(req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/notas\/\d+$/) && req.method === 'PUT') return mockApi.updateNota(Number(req.url.split('/').pop()), req.body as any).pipe(map(data => new HttpResponse({ status: 200, body: data })));
    if (req.url.match(/notas\/\d+$/) && req.method === 'DELETE') return mockApi.deleteNota(Number(req.url.split('/').pop())).pipe(map(data => new HttpResponse({ status: 200, body: data })));
  }

  return next(req);
};