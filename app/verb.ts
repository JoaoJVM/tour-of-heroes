export interface Verb {
    base?: string; // pull
    pres: string; // pulling
    past: string; // pulled
}
abstract class BaseVerb implements Verb {
    constructor(public base: string) {}
    pres: string;
    past: string;
}
class RegularVerb extends BaseVerb {
    base: string;
    get pres() { return this.base + "ing"; }
    get past() { return this.base + "ed"; }
}
class DoubleConsonantVerb extends BaseVerb {
    base: string;
    get pres() { return this.base + this.base[this.base.length-1] + "ing"; }
    get past() { return this.base + this.base[this.base.length-1] + "ed"; }
}
class FinalEVerb extends BaseVerb {
    base: string;
    get pres() { return this.base.slice(0,-1) + "ing"; }
    get past() { return this.base.slice(0,-1) + "ed"; }
}

let doubleConsonantVerbs: Set<string> = new Set(["chop"]);
let finalEVerbs: Set<string> = new Set([
    "bale", "dance", "decode"
]);
let irregularVerbs: {[base: string] : Verb} = {
    "ride" : {base: "ride", pres: "riding", past: "rode"},
    "read" : {base: "read", pres: "reading", past: "read"},
    "fight": {base: "fight", pres: "fighting", past: "fought"},
    "tiptoe":{base: "tiptoe", pres: "tiptoeing", past: "tiptoed"},
};

export function verbLookup(base: string) : Verb {
    if (doubleConsonantVerbs.has(base)) {
        return new DoubleConsonantVerb(base);
    } else if (finalEVerbs.has(base)) {
        return new FinalEVerb(base);
    } else if (base in irregularVerbs) {
        return irregularVerbs[base];
    } else {
        return new RegularVerb(base);
    }
}