import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export const axiosCached = setupCache(axios.create(), {
  ttl: 15 * 60 * 1000,
  methods: ['get', 'head', 'post'],
  interpretHeader: false,
});
