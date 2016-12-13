//This is a work around so the test files can find their code once compiled
//typescript understands that src/* is actually ./src/* due to the baseUrl
//in the tsconfig file.
//when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");

import { Pet } from 'src/functions/pets/model/Pet';
import { PetsLogic } from 'src/functions/pets/lib/PetsLogic';
import { LocalFileRepo as PetsRepo} from 'src/functions/pets/lib/repository/LocalFileRepo';
import { ResponseHandler } from 'src/lib/ResponseHandler';



export function pets(event: any, context: any, callback: Function) {
  let logic = new PetsLogic(new PetsRepo(), new ResponseHandler());
  logic.handle(event, context, callback);
}