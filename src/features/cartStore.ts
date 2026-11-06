// src/features/cartStore.ts

export type CartItem = {
    id : number;
    name : string;
    price : number;
    image: string;
};

export type CartLine = {
    product: CartItem;
    quantity: number;
}

type Listener = () => void;

class CartStore {
    private items: Map<number, CartLine> = new Map();
    private listeners: Listener[] = [];
    readonly instanceId: number = Date.now();

    public addItem(item: CartItem)
    {
        const product = this.items.get(item.id);
        if(product)
        {
            product.quantity += 1;
        } else
        {
            this.items.set(item.id, {product: item, quantity: 1});
        }
        this.notify();
    }
    removeItem(itemId: number)
    {
        this.items.delete(itemId);
        this.notify();
    }
    clearCart()
    {
        this.items.clear();
        this.notify();
    }
    /**
     * Returns domain data — no UI math, no formatting
     */
    getLines() : CartLine[]
    {
        return Array.from(this.items.values());
    }
    subscribe(listener: Listener)
    {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    public notify()
    {
        this.listeners.forEach(l => l());
    }
}

// implement singleton
// solo 1 instancia de cartStore

let cartInstance : CartStore | null = null;

export function getCartStore(): CartStore
{
    if(!cartInstance){
        cartInstance = new CartStore();
    }
    return cartInstance;
}

