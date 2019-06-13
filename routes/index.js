import express from 'express';
import Admin from './admin';

export default app => {
  app.use('/admin', Admin);
}
