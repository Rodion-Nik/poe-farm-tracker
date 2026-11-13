import { useEffect, useMemo, useState } from 'react';

export const IMAGE_BASE = 'https://web.poecdn.com';

export function usePrices() {
    const [state, setState] = useState({ status: 'loading', items: [], updatedAt: null, error: null });

    useEffect(() => {
        let cancelled = false;                 // компонент исчез до ответа — ответ игнорируем

        fetch('/api/prices')
            .then(res => {
                if (!res.ok) throw new Error(`сервер ответил ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!cancelled) setState({ status: 'ready', items: data.items, updatedAt: data.updatedAt, error: null });
            })
            .catch(err => {
                if (!cancelled) setState(s => ({ ...s, status: 'error', error: err.message }));
            });

        return () => { cancelled = true; };
    }, []);

    // замена старому getItemPrice: тот же Map id → цена, только из ответа сервера
    const priceById = useMemo(() => new Map(state.items.map(i => [i.id, i.price])), [state.items]);
    const getItemPrice = id => priceById.get(id) ?? 0;

    return { ...state, getItemPrice };
}