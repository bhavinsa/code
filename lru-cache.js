class LRU {
    constructor(max = 10) {
        this.max = max;
        this.cache = new Map();
    }

    get(key) {
        let item = this.cache.get(key);
        if (item) {
            // refresh key
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

    set(key, val) {
        // refresh key
        if (this.cache.has(key)) this.cache.delete(key);
        // evict oldest
        else if (this.cache.size == this.max) this.cache.delete(this.first());
        this.cache.set(key, val);
    }

    first() {
        return this.cache.keys().next().value;
    }
  
    getList(){
       console.log([...this.cache.entries()]); // [["B", "v:B"], ["C", "v:C"], ["A", "v:A"], ["D", "v:D"]]
       console.log([...this.cache.keys()]); // ["B", "C", "A", "D"]
       console.log([...this.cache.values()]); // ["v:B", "v:C", "v:A", "v:D"]
    }
}


let cache = new LRU(5);
let arr = ['A','B','C','A','D'];
arr.forEach(v => cache.set(v, 'v:'+v))
cache.getList();
