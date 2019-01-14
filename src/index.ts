import * as faqtor from "faqtor";
import * as bsync from "browser-sync";

export interface IBrowserSync {
    init(config: bsync.Options): faqtor.IFactor;
    reload(f: string | string[]): faqtor.IFactor;
}

export const create = (name?: string): IBrowserSync => new BrowserSync(name);

class BrowserSync implements IBrowserSync {
    private bc: bsync.BrowserSyncInstance;

    constructor(name?: string) {
        this.bc = bsync.create(name);
    }

    public init(config: bsync.Options): faqtor.IFactor {
        const run = () => new Promise<Error>((resolve) => {
            this.bc.init(config, (err) => resolve(err));
        })
        return faqtor.func(run);
    }

    public reload(f: string | string[]): faqtor.IFactor {
        const run = () => {
            if (typeof f === "string") {
                this.bc.reload(f);
            } else {
                this.bc.reload(f);
            }
            return null;
        }
        return faqtor.func(run, f);
    }
}