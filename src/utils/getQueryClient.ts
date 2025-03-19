import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

// 요청마다 새로운 QueryClient 인스턴스를 만들되 캐시
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
