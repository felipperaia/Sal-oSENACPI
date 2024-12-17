import { AppDataSource } from "../db/data-source";
import { Categoria } from "../models/categoria";

class CategoriaRepository {
    categoriaRepository = AppDataSource.getRepository(Categoria);

    async save(categoria: Categoria): Promise<Categoria> {
        try {
            await this.categoriaRepository.save(categoria);
            return categoria;
        } catch (err) {
            throw new Error("Falha ao criar a categoria!");
        }
    }

    async retrieveAll(): Promise<Array<Categoria>> {
        try {
            return this.categoriaRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar as categorias!");
        }
    }

    async retrieveById(categoriaId: number): Promise<Categoria | null> {
        try {
            return this.categoriaRepository.findOneBy({
                id_categoria: categoriaId,
            });
        } catch (error) {
            throw new Error("Falha ao buscar a categoria!");
        }
    }

    async retrieveByNome(n: string): Promise<Categoria | null> {
        try {
            return this.categoriaRepository.findOneBy({
                desc_cat: n,
            });
        } catch (error) {
            throw new Error("Falha ao buscar a categoria!");
        }
    }

    async update(categoria: Categoria) {
        const { id_categoria, desc_cat } = categoria;
        try {
            await this.categoriaRepository.save(categoria);
        } catch (error) {
            throw new Error("Falha ao atualizar a categoria!");
        }
    }

    async delete(categoriaId: number): Promise<number> {
        try {
            const categoriaEncontrada = await this.categoriaRepository.findOneBy({
                id_categoria: categoriaId,
            });
            if (categoriaEncontrada) {
                await this.categoriaRepository.remove(categoriaEncontrada);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar a categoria!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            let num = await this.categoriaRepository.query("select count(id_categoria) from categoria;");
            await this.categoriaRepository.query("delete from categoria;");
            return num[0]["count(id_categoria)"];
        } catch (error) {
            throw new Error("Falha ao deletar todas as categorias!");
        }
    }
}

export default new CategoriaRepository();
