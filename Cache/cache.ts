const cache = new Map<string, {data:any; timestamp:number}>();
const CACHE_DURATION = 300000;

export function getCached<T>(key: string): T | null {
  const now = Date.now();
  const cached = cache.get(key);

  if(cached && now - cached.timestamp < CACHE_DURATION){
    return cached.data as T;
  }

  return null
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, {data, timestamp:Date.now()})
}