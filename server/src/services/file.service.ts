import { File } from "../entity/File";
import { getRepository, Repository } from "typeorm";
import { FileUpload } from "graphql-upload";
import { finished } from "stream";
import fs from "fs";

export class FileService {
  private readonly fileRepository: Repository<File>;
  constructor() {
    this.fileRepository = getRepository(File);
  }

  public async create(file: FileUpload): Promise<File> {
    const { createReadStream, filename } = file;
    const tokens = filename.split(".");
    const ext = tokens[tokens.length - 1];
    const fileName =
      Date.now().toString() + Math.random() * 100000 + "." + ext;
    const stream = createReadStream();
    const out = fs.createWriteStream("./files/" + fileName);
    stream.pipe(out);
    finished(out, {}, () => {});
    return this.fileRepository
      .create({
        ...file,
        filename: fileName,
        url: "/files/" + fileName,
      })
      .save();
  }

  public async getOne(fileId: number): Promise<File | undefined> {
    return this.fileRepository.findOne({ where: { id: fileId } });
  }
}
