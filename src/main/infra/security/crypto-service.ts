import { ICryptoService } from "../../domain/common/security/crypto-service";
import * as crypto from "crypto";

export class CryptoService implements ICryptoService {

    public generateMD5(vlaueToHashed: string): string {

        const hash = crypto.createHash('md5').update(vlaueToHashed).digest('hex');
        return hash;
    }
}