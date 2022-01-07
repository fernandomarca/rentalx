import { container } from "tsyringe";
import { LocalStorageProvider } from "../StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "../StorageProvider/IStorageProvider";

const diskStorage = {
  local:LocalStorageProvider,
  s3:S3StorageProvider
}

const disk = process.env.disk === "local" ? "local" : "s3";
 
container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[disk]
)