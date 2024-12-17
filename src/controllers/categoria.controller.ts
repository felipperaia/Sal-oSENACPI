import { Request, Response } from "express";
import { Categoria } from "../models/categoria";
import categoriaRepository from "../repositories/categoria.repository";

export default class CategoriaController {

    async create(req: Request, res: Response) {
        if (!req.body.desc_cat) {
            res.status(400).send({
                message: "Não pode ser vazio a categoria!"
            });
            return;
        }

        try {
            const categoria: Categoria = req.body;
            const savedCategoria = await categoriaRepository.save(categoria);
            res.status(201).send(savedCategoria);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar a categoria."
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categorias = await categoriaRepository.retrieveAll();
            res.status(200).send(categorias);
        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado quando estava se fazendo a busca por todas as categorias."
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const categoria = await categoriaRepository.retrieveById(id);
            if (categoria) res.status(200).send(categoria);
            else
                res.status(404).send({
                    message: `Não foi encontrada nenhuma categoria com esse id=${id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Erro: não foi possível retornar a categoria com id=${id}.`
            });
        }
    }

    async findName(req: Request, res: Response) {
        const nome: string = req.params.nome;

        try {
            const categoria = await categoriaRepository.retrieveByNome(nome);
            if (categoria) res.status(200).send(categoria);
            else
                res.status(404).send({
                    message: `Não foi encontrada nenhuma categoria com esse nome=${nome}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Erro: não foi possível retornar a categoria com nome=${nome}.`
            });
        }
    }

    async update(req: Request, res: Response) {
        let categoria: Categoria = req.body;
        categoria.id_categoria = parseInt(req.params.id);     
        try {
            await categoriaRepository.update(categoria);
            res.send({
                message: `Categoria ${categoria.desc_cat} atualizada com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar a categoria com id=${categoria.id_categoria}.`
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await categoriaRepository.delete(id);

            if (num == 1) {
                res.send({
                    message: "Categoria deletada com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar a categoria com id=${id}. A categoria não foi encontrada.`,
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `A categoria com id=${id} não pode ser deletada.`
            });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await categoriaRepository.deleteAll();

            res.send({ message: `${num} Categorias foram deletadas com sucesso!` });
        } catch (err) {
            res.status(500).send({
                message: "Algum erro ocorreu enquanto deletava todas as categorias."
            });
        }
    }

}
