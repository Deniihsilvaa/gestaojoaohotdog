import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ajaxRequest } from "../../../services/Ajax";
import '../../../styles/Caixa/Modal.css';
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

const FormCategoria = () => {
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
        console.log('Dados JSON:', dadosJSON);

        try {
            const response = await ajaxRequest({ data: { qualFuncao: "salvarRegistro", dados: dadosJSON } });
            console.log('Response:', response);
            if (response.situacao){
                console.log('Registro salvo com sucesso:', response.mensagem);
                alert('Registro salvo com sucesso!');
                setCarregando(false);
                setSubmitting(false);

            }else{
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


                </Form>
            )}
        </Formik>
    );
};

export default FormCategoria;
