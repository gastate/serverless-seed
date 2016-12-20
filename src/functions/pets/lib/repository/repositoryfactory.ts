import AWS = require('aws-sdk');
import { PetsRepository } from 'src/functions/pets/lib/repository/petsrepository';
import { LocalFileRepo } from 'src/functions/pets/lib/repository/localfilerepo';
import { S3Repo } from 'src/functions/pets/lib/repository/s3repo';
import { PetsConfig } from 'src/functions/pets/model/petsconfig';


//This factory determines what type of repository should be used
//If it is local dev, use the repo that writes to temp file
//If running as a lambda, use the repo that writes to s3
export class RepositoryFactory {
    private config: PetsConfig;

    constructor(config: PetsConfig) {
        this.config = config;
    }

    getRepository(): PetsRepository {
        if (this.config.isServerless === 'true') {
            return new S3Repo(this.config, AWS);
        }

        return new LocalFileRepo();
    }
}
