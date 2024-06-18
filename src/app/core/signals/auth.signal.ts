import { computed, signal } from '@angular/core';

const token = signal(localStorage.getItem('token'));

export const isLoggedIn = computed(() => !!token());

export function login(newToken: string) {
    localStorage.setItem('token', newToken);
    token.set(newToken);
}

export function logout() {
    localStorage.removeItem('token');
    token.set(null);
}
