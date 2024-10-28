import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ajaxRequest } from "../../../services/Ajax";
import '../../../styles/Caixa/Modal.css';
import Spinner from "../../Spinner/spinner";
// Validação do esquema usando Yup
const validationSchema = Yup.object().shape({
    descricao: Yup.string().required("Descrição é obrigatória"),
    valor: Yup.number()
        .required("Valor é obrigatório")
        .positive("Valor deve ser positivo"),
    data: Yup.date().required("Data é obrigatória"),
    categoria: Yup.string().required("Categoria é obrigatória"),
    situacao: Yup.string().required("Situação é obrigatória"),
    tipoDeCaixa: Yup.string().required("Tipo de Caixa é obrigatório"),
    tipoDeConta: Yup.string().required("Tipo de Conta é obrigatória"),
});

const FormRegistros = ({ updateData }) => {

    const initialValues = {
        idRegistro: "",
        descricao: "",
        valor: "",
        data: "",
        categoria: "",
        situacao: "",
        tipoDeCaixa: "",
        tipoDeConta: "",
    };
    const [tiposDeCaixa, setTiposDeCaixa] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(false);
    useEffect(() => {
        // fetchTiposDeCategoria();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        setCarregando(true);
        const dadosJSON = JSON.stringify(values);
        <initialValues />

        try {
            const response = await ajaxRequest({ data: { qualFuncao: "salvarRegistro", dados: dadosJSON } });

            console.log('Response:', response);
            if (response.situacao) {
                updateData();
                console.log('Registro salvo com sucesso:', response.mensagem);
                setCarregando(false);
                setSubmitting(false);
            } else {
                setCarregando(false);
                console.error('Erro ao salvar o registro:', response.mensagem);
                alert('Erro ao salvar o registro, tente novamente.');
                setSubmitting(false);
            }

        } catch (error) {
            console.error("Erro ao salvar o registro:", error.message);
            alert('Erro ao salvar o registro, tente novamente.');
            setCarregando(false);
            setSubmitting(false);
        }
    };

    const fetchTiposDeCategoria = async (value) => {
        setCarregando(true);
        try {
            const response = await ajaxRequest({
                data: { qualFuncao: "carregarCadastroTipoCategoria", categoria: value },
            });
            if (Array.isArray(response)) {
                setTiposDeCaixa(response);
            } else {
                console.error(
                    "A resposta não contém um array de tipos de registros",
                    response
                );
            }
        } catch (error) {
            console.error("Erro na requisição", error);
        } finally {
            setCarregando(false);
        }
    };

    const onclose = () => {
        console.log('Alerta fechado');
        // Adicione aqui o código que você deseja executar quando o alerta for fechado
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form>

                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="idRegistro">ID Registro</label>
                                <Field type="text" name="idRegistro" className="form-control" />
                                <ErrorMessage
                                    name="idRegistro"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <Field type="text" name="descricao" className="form-control" />
                                <ErrorMessage
                                    name="descricao"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="categoria">
                                    Categoria
                                </label>
                                <Field
                                    as="select"
                                    name="categoria"
                                    className="form-control"
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        setFieldValue("categoria", selectedValue);
                                        setCategoriaSelecionada(!!selectedValue);
                                        fetchTiposDeCategoria(selectedValue);
                                    }}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Entrada">Entrada</option>
                                    <option value="Saída">Saída</option>
                                </Field>

                                <ErrorMessage
                                    name="categoria"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="tipoDeCaixa">Tipo de Registros</label>
                                <Field
                                    as="select"
                                    name="tipoDeCaixa"
                                    className="form-control"
                                    disabled={!categoriaSelecionada} // Desabilitado até que uma categoria seja selecionada
                                >
                                    <option value="">Selecione um tipo</option>
                                    {tiposDeCaixa.map((tipo) => (
                                        <option key={tipo.id} value={tipo.grupo}>
                                            {tipo.grupo}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="tipoDeCaixa"
                                    component="div"
                                    className="text-danger"
                                />
                                {carregando && (
                                    <div>
                                        Carregando...
                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="valor">R$ Valor</label>
                                <Field type="number" name="valor" className="form-control" />
                                <ErrorMessage
                                    name="valor"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="data">Data</label>
                                <Field type="date" name="data" className="form-control" />
                                <ErrorMessage
                                    name="data"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="situacao">Situação</label>
                                <Field as="select" name="situacao" className="form-control">
                                    <option value="">Selecione uma situação</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Pago">Pago</option>
                                    <option value="Cancelado">Cancelado</option>
                                </Field>
                                <ErrorMessage
                                    name="situacao"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label htmlFor="tipoDeConta">Tipo de Conta</label>
                                <Field as="select" name="tipoDeConta" className="form-control">
                                    <option value="">Selecione um tipo</option>
                                    <option value="Caixa">Caixa</option>
                                </Field>
                                <ErrorMessage
                                    name="tipoDeConta"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="col-md-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                        Enviando...
                                    </>
                                ) : (
                                    "Salvar"
                                )}
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormRegistros;
