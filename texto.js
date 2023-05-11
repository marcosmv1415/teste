var Global = (function () { return this; }());
var ResumoAlta = null;

var Js = (function (Js) {
    Js.ResumoAlta = function (item, idAtendimento, codigoPessoa, examesGravados, examesRealizados, examesInvasivosRealizados, autor, tempoSessao, urlRedirectExameImagem, bloquearEdicao, temAnamneseLiberada, IdAnamneseLiberada, horariosDisponiveis, teleAltaHabilitado, toolTipAltaDigital) {
        try {
            //TeleAlta
            this.TeleAltaHabilitado = teleAltaHabilitado;
            this.ToolTipAltaDigital = toolTipAltaDigital;
            this.temAnamneseLiberada = temAnamneseLiberada;
            this.IdAnamneseLiberada = IdAnamneseLiberada;
            this.Item = item;
            if (this.Item.IdResumoAlta > 0) {
                this.Item.Exames = examesGravados;
            }
            else {
                this.Item.Exames = examesInvasivosRealizados;
            }
            this.IdAtendimento = idAtendimento;
            this.CodigoPessoa = codigoPessoa;
            this.ExamesRealizados = examesRealizados;
            this.HorariosDisponiveis = horariosDisponiveis;
            this.Autor = autor;
            this.TempoSessao = tempoSessao;
            this.UrlRedirectExameImagem = urlRedirectExameImagem;
            this.BloquearEdicao = bloquearEdicao;

            this.InicializarElementosTela();
            this.InicializarVariaveis();

            //Define o escopo para fechamento do modal.
            Js.Util.DefinirEscopo(this);

            this.CarregarEventos();
            this.CarregarPlugins();
            this.CarregarCombos();
            this.CarregarDados();

            this.RedimensionarTela();

            if (this.Item.IdResumoAlta == 0) {
                this.VerificarAnamnese();
            }
        } catch (ex) {
            Js.Util.TratarErro('Js.ResumoAlta', ex.message);
        }
    };

    Js.ResumoAlta.prototype = {
        InicializarElementosTela: function () {
            this.$Principal = $('#principal');
            this.$Form = $('#form');
            this.$DivBotoes = $('#divBotoes');
            this.$DivErro = $('#divErro');
            this.$DivHidden = $('.hide');
            this.$DivHistoricoInternacao = $('.historicoInternacao');

            //Motivo de Internação
            this.$TxtMotivoInternacao = $('#txtMotivoInternacao');
            this.$TxtHistoricoInternacao = $('#txtHistoricoInternacao');

            //Diagnósticos
            this.$TxtDiagnosticoPrincipal = $('#txtDiagnosticoPrincipal');
            this.$TxtOutrosDiagnosticos = $('#txtOutrosDiagnosticos');
            this.$LstOutrosDiagnosticos = $('#lstOutrosDiagnosticos');
            this.$LnkAdicionarOutroDiagnostico = $('#lnkAdicionarOutroDiagnostico');

            //Procedimentos
            this.$TxtProcedimentoCirurgico = $('#txtProcedimentoCirurgico');
            this.$TxtDataProcedimentoCirurgico = $('#txtDataProcedimentoCirurgico');
            this.$LnkCalendarioProcedimentoCirurgico = $('#lnkCalendarioProcedimentoCirurgico');
            this.$LnkAdicionarProcedimentoCirurgico = $('#lnkAdicionarProcedimentoCirurgico');
            this.$LstProcedimentosCirurgicos = $('#lstProcedimentosCirurgicos');

            //Exames
            this.$LnkAdicionarExame = $('#lnkAdicionarExame');
            this.$LstExames = $('#lstExames');
            this.$CboExame = $('#cboExame');

            //Intercorrências
            this.$RbtIntercorrenciasSim = $('#rbtIntercorrenciasSim');
            this.$RbtIntercorrenciasNao = $('#rbtIntercorrenciasNao');
            this.$TxtIntercorrencias = $('#txtIntercorrencias');

            //Tratamento/Principais Medicações Administradas
            this.$TxtTratamento = $('#txtTratamento');
            this.$TxtMedicacao = $('#txtMedicacao');
            this.$LstPrincipaisMedicacoes = $('#lstPrincipaisMedicacoes');
            this.$LnkAdicionarMedicacao = $('#lnkAdicionarMedicacao');

            //Antibióticos
            this.$RbtAntibioticosSim = $('#rbtAntibioticosSim');
            this.$RbtAntibioticosNao = $('#rbtAntibioticosNao');
            this.$SpnMensagemPadraoAntibiotico = $('#spnMensagemPadraoAntibiotico');
            this.$TxtAntibioticos = $('#txtAntibioticos');

            //Medicação de Alta
            this.$RbtMedicacaoAltaSim = $('#rbtMedicacaoAltaSim');
            this.$RbtMedicacaoAltaNao = $('#rbtMedicacaoAltaNao');
            this.$TxtMedicacaoAlta = $('#txtMedicacaoAlta');

            //Restrição de Atividade Física
            this.$RbtRestricaoAtividadeFisicaSim = $('#rbtRestricaoAtividadeFisicaSim');
            this.$RbtRestricaoAtividadeFisicaNao = $('#rbtRestricaoAtividadeFisicaNao');
            this.$TxtRestricaoAtividadeFisica = $('#txtRestricaoAtividadeFisica');

            //Dieta Especial
            this.$RbtDietaEspecialSim = $('#rbtDietaEspecialSim');
            this.$RbtDietaEspecialNao = $('#rbtDietaEspecialNao');
            this.$TxtDietaEspecial = $('#txtDietaEspecial');

            //Outras Orientações
            this.$RbtOutrasOrientacoesSim = $('#rbtOutrasOrientacoesSim');
            this.$RbtOutrasOrientacoesNao = $('#rbtOutrasOrientacoesNao');
            this.$TxtOutrasOrientacoes = $('#txtOutrasOrientacoes');

            //Fieldset de Perguntas
            this.$PerguntasColOpcao = $('#tblPerguntas').find('.colOpcao');
            this.$PerguntasColOpcaoRadio = $('#tblPerguntas').find('.colOpcaoSim input[type=radio]');

            //Tipo de Saída / Motivo de Saída
            this.$RbtTipoSaidaAlta = $('#rbtlTipoSaida').find('input[value="A"]');
            this.$RbtTipoSaidaObito = $('#rbtlTipoSaida').find('input[value="O"]');
            this.$RbtTipoSaidaTransferencia = $('#rbtlTipoSaida').find('input[value="T"]');
            this.$DivRbtlTipoSaidaOpcaoAlta = $('#rbtlTipoSaidaOpcaoAlta');
            this.$RbtTipoSaidaOpcaoAlta = $('#rbtlTipoSaidaOpcaoAlta').find('input[type="radio"]');
            this.$TxtTransferenciaExterna = $('#txtTransferenciaExterna');
            this.$MotivoSaidaAlta = $('.motivoSaidaAlta');
            this.$MotivoSaidaObito = $('.motivoSaidaObito');
            this.$MotivoSaidaTransferenciaExterna = $('.motivoSaidaTransferenciaExterna');
            this.$RbtNecropsiaSim = $('#rbtNecropsiaSim');
            this.$SpanSaidaAlta = $('#spanSaidaAlta');
            this.$DivTipoAlta = $('#divTipoAlta');

            //Data da Alta
            this.$TxtDataAlta = $('#txtDataAlta');
            this.$LnkCalendarioDataAlta = $('#lnkCalendarioDataAlta');
            this.$TxtHoraAlta = $('#txtHoraAlta');
            this.$TxtMedico = $('#txtMedico');

            //Telealta
            this.$TxtDataTeleAlta = $('#txtDataTeleAlta');
            this.$LnkCalendarioDataTeleAlta = $('#lnkCalendarioDataTeleAlta');
            this.$TxtHoraTeleAlta = $('#txtHoraTeleAlta');
            this.$CheckTelealta = $('#checkTelealta');
            this.$CboHoraTeleAlta = $('#cboHoraTeleAlta');
            this.$DivCamposTeleAlta = $('#divCamposTeleAlta');
            this.$TxtEmailMedico = $('#txtEmailMedico');
            this.$TxtTelefoneMedico = $('*[id*=txtTelefoneMedico]');
            this.$DivTeleAlta = $('#divTeleAlta');

            //Botoes
            this.$LnkSalvar = $('#lnkSalvar');
            this.$LnkLiberar = $('#lnkLiberar');
            this.$LnkVoltar = $('#lnkVoltar');
            this.$LnkImprimir = $('#lnkImprimir');
            this.$LnkExcluir = $('#lnkExcluir');
            this.$LnkSuspender = $('#lnkSuspender');

            //Status - Footer
            this.$DivStatusDesc = $('#divStatusDesc');
            this.$DivModalImpressao = $('#divModalImpressao');

            //TextArea com tamanho
            this.$TextAreaMaxLength = $('textarea[length]');
        },

        InicializarVariaveis: function () {
            try {
                this.$OutroDiagnosticoSelecionado = null;
                this.$ProcedimentoCirurgicoSelecionado = null;
                this.ExibirConfirmacaoNaoLiberado = (!this.BloquearEdicao);
                this.$CheckTelealta.tooltip();
                this.$CheckTelealta.attr('title', this.ToolTipAltaDigital);
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.InicializarVariaveis', ex.message, false, ex, arguments);
            }
        },

        CarregarCombos: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                if (this.ExamesRealizados) {
                    this.$CboExame.append($('<option></option>'));
                    $(this.ExamesRealizados).each(function (i, v) {
                        delete v.ExtensionData;
                        var option = $('<option></option>')
                            .val(v.NrPrescricao + '_' + v.Sequencia)
                            .text(v.DescricaoAutoComplete)
                            .data('Item', v);
                        escopo.$CboExame.append(option);
                    });
                }

                this.CarregarComboHoraTeleAlta();


            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.CarregarCombos', ex.message, false, ex, arguments);
            }
        },

        CarregarComboHoraTeleAlta: function () {
            var escopo = Global.ResumoAlta;
            if (!escopo) escopo = this;
            if (escopo.HorariosDisponiveis) {
                escopo.$CboHoraTeleAlta.find('option').remove().end().append($('<option></option>'));
                $(escopo.HorariosDisponiveis).each(function (i, v) {
                    delete v.ExtensionData;
                    var option = $('<option></option>')
                        .val(v.Hora)
                        .text(v.Hora)
                        .data('Item', v);
                    escopo.$CboHoraTeleAlta.append(option);
                });
                escopo.$CboHoraTeleAlta.val('');
                escopo.$CboHoraTeleAlta.HslComboBox('updateValue');
            }
        },

        CarregarDados: function () {
            try {
                var escopo = this;
                $(this.Item.OutrosDiagnosticos).each(function (i, v) {
                    delete v.ExtensionData;
                    escopo.AdicionarOutroDiagnostico(true, v);
                });
                $(this.Item.Procedimentos).each(function (i, v) {
                    delete v.ExtensionData;
                    v.Data = escopo.TransformarDataJson(v.Data);
                    escopo.AdicionarProcedimentoCirurgico(true, v);
                });
                $(this.Item.Exames).each(function (i, v) {
                    delete v.ExtensionData;
                    v.Data = escopo.TransformarDataJson(v.Data);
                    escopo.AdicionarExame(v, true);
                });
                $(this.Item.MedicamentosAdministrados).each(function (i, v) {
                    delete v.ExtensionData;
                    escopo.AdicionarMedicacao(v, escopo.$LstPrincipaisMedicacoes, escopo.$TxtMedicacao, true);
                });
                $(this.Item.Antibioticos).each(function (i, v) {
                    delete v.ExtensionData;
                    escopo.AdicionarMedicacao(v, escopo.$LstAntibioticos, escopo.$TxtAdicionarAntibiotico, escopo.$TxtAdicionarAntibioticoPrazo, true);
                });
                $(this.Item.MedicamentosAlta).each(function (i, v) {
                    delete v.ExtensionData;
                    escopo.AdicionarMedicacao(v, escopo.$LstMedicacaoAlta, escopo.$TxtMedicacaoAlta, null, true);
                });

                escopo.$TxtMotivoInternacao.val(escopo.Item.MotivoInternacao);
                escopo.$TxtTratamento.val(escopo.Item.Tratamento);
                escopo.$TxtHistoricoInternacao.val(escopo.Item.HistoricoInternacao);

                escopo.$DivHidden.hide();
                escopo.$DivHistoricoInternacao.show();

                if (escopo.Item.DataLiberacao != null && (escopo.Item.Tratamento != null || escopo.Item.MotivoInternacao != null)) {
                    escopo.$DivHidden.show();
                    escopo.$DivHistoricoInternacao.hide();
                } else if (escopo.Item.DataLiberacao == null && (escopo.Item.Tratamento != null || escopo.Item.MotivoInternacao != null)) {
                    escopo.$TxtHistoricoInternacao.val('Motivo da Internação: <br>' + escopo.Item.MotivoInternacao + '<br> Descrição do tratamento: <br>' + escopo.Item.Tratamento);
                    escopo.$TxtMotivoInternacao.val(null);
                    escopo.$TxtTratamento.val(null);
                }

                var codDiagnostico = '';
                if (escopo.Item.CodDiagnosticoPrincipal != null) {
                    codDiagnostico = escopo.Item.CodDiagnosticoPrincipal + ' - ';
                }
                if (escopo.Item.DiagnosticoPrincipal) {
                    escopo.$TxtDiagnosticoPrincipal.val(codDiagnostico + escopo.Item.DiagnosticoPrincipal);
                }

                if (escopo.Item.Intercorrencias) {
                    escopo.$RbtIntercorrenciasSim.click();
                }
                escopo.$TxtIntercorrencias.val(escopo.Item.DescIntercorrencias);

                if (escopo.Item.Antibiotico) {
                    escopo.$RbtAntibioticosSim.click();
                }
                escopo.$TxtAntibioticos.val(escopo.Item.DescAntibioticoAlta);
                if (escopo.Item.MedicamentoAlta) {
                    escopo.$RbtMedicacaoAltaSim.click();
                }
                escopo.$TxtMedicacaoAlta.val(escopo.Item.DescMedicamentoAlta);
                if (escopo.Item.RestricaoAtividade) {
                    escopo.$RbtRestricaoAtividadeFisicaSim.click();
                }
                escopo.$TxtRestricaoAtividadeFisica.val(escopo.Item.DescRestricaoAtividade);
                if (escopo.Item.DietaEspecial) {
                    escopo.$RbtDietaEspecialSim.click();
                }
                escopo.$TxtDietaEspecial.val(escopo.Item.DescDietaEspecial);
                if (escopo.Item.OutrasOrientacoes) {
                    escopo.$RbtOutrasOrientacoesSim.click();
                }
                escopo.$TxtOutrasOrientacoes.val(escopo.Item.DescOutrasOrientacoes);

                $('input[name="' + escopo.$RbtTipoSaidaAlta.attr('name') + '"][value="' + escopo.Item.TipoSaida + '"]').click();
                if (escopo.Item.TipoSaida == 'A') {
                    escopo.$RbtTipoSaidaOpcaoAlta.each(function () {
                        if (this.value == escopo.Item.TipoSaidaAlta) $(this).click();
                    });
                }

                if (escopo.Item.TipoSaida == 'O') {
                    $('input[name="' + escopo.$MotivoSaidaObito.find('input[type="radio"]').attr('name') + '"][value="' + escopo.Item.TipoObito + '"]').click();
                    if (escopo.Item.Necropsia) {
                        escopo.$RbtNecropsiaSim.click();
                    }
                }
                else {
                    if (escopo.Item.TipoSaida == 'T') {
                        escopo.$TxtTransferenciaExterna.val(escopo.Item.TransferenciaExterna);
                    }
                    $('input[name="' + escopo.$MotivoSaidaAlta.find('input[type="radio"]').attr('name') + '"][value="' + escopo.Item.MotivoSaida + '"]').click();
                }

                if (escopo.Item.DataAlta == null) {
                    escopo.$TxtDataAlta.val('');
                }
                else {
                    var dataAlta = (escopo.Item.DataAlta ? escopo.TransformarDataJson(escopo.Item.DataAlta) : new Date());
                    escopo.$TxtDataAlta.val(Js.Util.DataParaTexto(dataAlta));
                    escopo.$TxtHoraAlta.val(Js.Util.FormatarHorario(dataAlta));
                }

                var dataTeleAlta = (escopo.Item.DataTeleAlta ? escopo.TransformarDataJson(escopo.Item.DataTeleAlta) : '');
                if (dataTeleAlta !== '' && escopo.Item.NrSeqAgendaAltaDigital !== 0) {
                    escopo.$TxtDataTeleAlta.val(Js.Util.DataParaTexto(dataTeleAlta));
                    escopo.$CboHoraTeleAlta.val('');
                    escopo.$CboHoraTeleAlta.HslComboBox('updateValue');
                    escopo.$TxtHoraTeleAlta.val('');
                    escopo.$CheckTelealta.attr('checked', 'checked');
                    escopo.$TxtEmailMedico.val(escopo.Item.EmailMedico);
                    escopo.$TxtTelefoneMedico.val(escopo.Item.TelefoneMedico ? escopo.Item.TelefoneMedico.replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, '$1 ($2) $3-$4') : null);
                }
                else {
                    escopo.$DivCamposTeleAlta.hide()
                }

                escopo.$TxtMedico.val(escopo.Item.Medico);

                escopo.$LnkImprimir.hide();
                escopo.$LnkSuspender.hide();
                escopo.$LnkExcluir.hide();
                if (escopo.Item.IdResumoAlta > 0) {
                    var status = (escopo.Item.DataLiberacao != null) ? (escopo.Item.Ativo ? 'Liberado' : 'Suspenso') : 'Salvo';
                    var data = (escopo.TransformarDataJson(escopo.Item.DataAlteracao));
                    var dia = Js.Util.DataParaTexto(data);
                    var hora = Js.Util.FormatarHorario(data);
                    escopo.$DivStatusDesc.html(status + ' por <strong>' + escopo.Item.Medico + '</strong> no dia <strong>' + dia + ' às ' + hora + '</strong>');
                    escopo.$LnkExcluir.show();
                    if (!escopo.Item.Ativo) {
                        escopo.TravarCampos();
                        escopo.$LnkSuspender.hide();
                        escopo.$LnkImprimir.hide();
                        escopo.$LnkSalvar.hide();
                        escopo.$LnkLiberar.hide();
                    }
                    if (escopo.Item.DataLiberacao != null) {
                        escopo.TravarCampos();
                    }

                    this.ExibirConfirmacaoNaoLiberado = (!(escopo.Item.DataLiberacao != null) && !this.BloquearEdicao);
                }

                escopo.$MotivoSaidaAlta.find('[ativo="n"] > [type="radio"]:not(:checked)').each(function () {
                    $(this).parent().hide();
                });

                escopo.ExibirOpcaoSaidaAlta();
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.CarregarDados', ex.message, false, ex, arguments);
            }
        },

        CarregarEventos: function () {
            try {
                var escopo = Global.PrescricaoLiberacao;
                if (!escopo) escopo = this;

                this.$TxtOutrosDiagnosticos.keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        if (escopo.ValidarOutroDiagnostico()) {
                            escopo.AdicionarOutroDiagnostico();
                        }
                    }
                });

                this.$LnkAdicionarOutroDiagnostico.click(function () {
                    if (escopo.ValidarOutroDiagnostico()) {
                        escopo.AdicionarOutroDiagnostico();
                    }
                });

                this.$LnkAdicionarProcedimentoCirurgico.click(function () {
                    if (escopo.ValidarProcedimentoCirurgico()) {
                        escopo.AdicionarProcedimentoCirurgico();
                    }
                });

                this.$LnkAdicionarExame.click(function () {
                    if (escopo.ValidarExame()) {
                        escopo.AdicionarExame(escopo.$CboExame.data('Item'));
                    }
                });

                this.$LnkAdicionarMedicacao.keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        if (escopo.ValidarMedicacao()) {
                            escopo.AdicionarMedicacao(escopo.$TxtMedicacao.data('Item'), escopo.$LstPrincipaisMedicacoes, escopo.$TxtMedicacao);
                        };
                    }
                });
                this.$LnkAdicionarMedicacao.click(function () {
                    if (escopo.ValidarMedicacao()) {
                        escopo.AdicionarMedicacao(escopo.$TxtMedicacao.data('Item'), escopo.$LstPrincipaisMedicacoes, escopo.$TxtMedicacao);
                    };
                });

                this.ControlarVisibilidade(this.$RbtAntibioticosSim, [this.$TxtAntibioticos, this.$SpnMensagemPadraoAntibiotico], null);
                this.ControlarVisibilidade(this.$RbtAntibioticosNao, null, [this.$TxtAntibioticos, this.$SpnMensagemPadraoAntibiotico]);

                this.ControlarVisibilidade(this.$RbtMedicacaoAltaSim, this.$TxtMedicacaoAlta, null);
                this.ControlarVisibilidade(this.$RbtMedicacaoAltaNao, null, this.$TxtMedicacaoAlta);

                this.ControlarVisibilidade(this.$RbtIntercorrenciasSim, this.$TxtIntercorrencias, null);
                this.ControlarVisibilidade(this.$RbtIntercorrenciasNao, null, this.$TxtIntercorrencias);

                this.ControlarVisibilidade(this.$RbtRestricaoAtividadeFisicaSim, this.$TxtRestricaoAtividadeFisica, null);
                this.ControlarVisibilidade(this.$RbtRestricaoAtividadeFisicaNao, null, this.$TxtRestricaoAtividadeFisica);

                this.ControlarVisibilidade(this.$RbtDietaEspecialSim, this.$TxtDietaEspecial, null);
                this.ControlarVisibilidade(this.$RbtDietaEspecialNao, null, this.$TxtDietaEspecial);

                this.ControlarVisibilidade(this.$RbtOutrasOrientacoesSim, this.$TxtOutrasOrientacoes, null);
                this.ControlarVisibilidade(this.$RbtOutrasOrientacoesNao, null, this.$TxtOutrasOrientacoes);

                this.ControlarVisibilidade(this.$RbtTipoSaidaAlta, new Array(this.$MotivoSaidaAlta, this.$DivTipoAlta), new Array(this.$MotivoSaidaObito, this.$MotivoSaidaTransferenciaExterna));
                this.ControlarVisibilidade(this.$RbtTipoSaidaObito, this.$MotivoSaidaObito, new Array(this.$MotivoSaidaAlta, this.$MotivoSaidaTransferenciaExterna, this.$DivTipoAlta));
                this.ControlarVisibilidade(this.$RbtTipoSaidaTransferencia, this.$MotivoSaidaTransferenciaExterna, new Array(this.$MotivoSaidaAlta, this.$MotivoSaidaObito, this.$DivTipoAlta));

                this.$PerguntasColOpcaoRadio.click(function (event) { $(event.target).parent().parent().find('.colResposta textarea,.colResposta input[type=text]').focus(); });
                this.$PerguntasColOpcao.click(function (event) { $(event.target).find('input[type=radio]').click(); });

                this.$LnkSalvar.click(function () { escopo.Salvar(false); });
                this.$LnkLiberar.click(function () { escopo.Salvar(true); });
                this.$LnkVoltar.click(function () { escopo.FecharPagina(); });

                this.$LnkImprimir.click(function () { escopo.VisualizarRelatorio(); });

                this.$LnkExcluir.click(function () { escopo.Remover(); });
                this.$LnkSuspender.click(function () { escopo.Remover(); });

                this.$DivHidden.hide();
                this.$DivHistoricoInternacao.show();

                var $arrHora = [this.$TxtHoraAlta
                    // , this.$TxtHoraTeleAlta
                ];
                $($arrHora).each(function () {
                    $(this).blur(function () {
                        var horario = $(this).val();
                        if ((horario) && horario != '__:__') {
                            var horas = Js.Util.RetornarHoras(horario);
                            var minutos = Js.Util.RetornarMinutos(horario);

                            if (horas >= 0 && minutos >= 0) {
                                var data = new Date();
                                data.setHours(horas);
                                data.setMinutes(minutos);

                                $(this).val(Js.Util.FormatarHorario(data));
                            } else {
                                $(this).val('');
                            }
                        }
                    });
                });

                this.$TxtDataAlta.blur(function () {
                    var escopo = Global.ResumoAlta;
                    escopo.$TxtDataTeleAlta.val($(this).val());
                });

                this.$CheckTelealta.click(function () {
                    var escopo = Global.ResumoAlta;
                    if ($(this).is(':checked')) {
                        escopo.$TxtDataTeleAlta.val(escopo.$TxtDataAlta.val());
                        escopo.$DivCamposTeleAlta.show();
                        escopo.RetornarHorariosDisponiveis(Js.Util.TextoParaData(escopo.$TxtDataAlta.val()));
                        escopo.$TxtHoraAlta.prop('readonly', true);
                    } else {
                        escopo.$TxtDataTeleAlta.val('');
                        escopo.CarregarComboHoraTeleAlta();
                        escopo.$TxtHoraTeleAlta.val('');
                        escopo.$DivCamposTeleAlta.hide();
                        escopo.$TxtHoraAlta.prop('readonly', false);
                    }
                });

                $([this.$RbtTipoSaidaAlta, this.$RbtTipoSaidaObito, this.$RbtTipoSaidaTransferencia]).each(function () {
                    this.click(function () { escopo.ExibirOpcaoSaidaAlta(); });
                });

                Js.Util.ManterSessaoFormulario(this.$Form, null, this.TempoSessao);
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.CarregarEventos', ex.message, false, ex, arguments);
            }
        },

        CarregarPlugins: function () {
            var escopo = this;

            this.$TxtOutrosDiagnosticos.blur(function () {
                if ($.trim($(this).val()) == '' || $(this).val() == $(this).attr('placeholder')) {
                    escopo.$OutroDiagnosticoSelecionado = null;
                }
            });

            $([this.$TxtMedicacao]).each(function (i, v) {
                $(v).HslAutoComplete({
                    origemDados: '/servicoMedicamentoJson/Medicamento/Pesquisar/',
                    campoDescricao: 'DescReduzida',
                    campoValor: 'CodMedicamento',
                    inputText: "Digite para localizar um medicamento",
                    parametrosAdicionais: [{ valor: 0, tipo: 1 }],
                    appendParent: true,
                    proximoCampo: false,
                    select: function (event, item) {
                        var itemConvertido = {
                            IdMedicamento: 0,
                            IdResumoAlta: escopo.Item.IdResumoAlta,
                            Codigo: item.CodMedicamento,
                            Descricao: item.DescReduzida
                        };
                        $(v).data('Item', itemConvertido);
                    },
                    sourceNotFound: function () {
                    }
                });
                $(v).blur(function () {
                    if ($.trim($(this).val()) == '' || $(this).val() == $(this).attr('placeholder')) {
                        $.removeData($(v), 'Item');
                    }
                });
            });

            this.$TxtProcedimentoCirurgico.HslAutoComplete({
                origemDados: '/servicoProcedimentoJson/ProcedimentoCirurgico/Pesquisar/',
                campoDescricao: 'DescProcedimento',
                campoValor: 'CodProcedimento',
                inputText: "Digite para localizar um procedimento",
                parametrosAdicionais: [
                    { valor: 1, tipo: 1 },
                    { valor: true, tipo: 1 }
                ],
                appendParent: true,
                select: function (event, item) {
                    escopo.$ProcedimentoCirurgicoSelecionado = {
                        IdProcedimento: 0,
                        IdResumoAlta: escopo.Item.IdResumoAlta,
                        Codigo: item.CodProcedimentoSih,
                        Descricao: item.DescProcedimento
                    };
                }
            });
            this.$TxtProcedimentoCirurgico.blur(function () {
                if ($.trim($(this).val()) == '' || $(this).val() == $(this).attr('placeholder')) {
                    escopo.$ProcedimentoCirurgicoSelecionado = null;
                }
            });

            this.$CboExame.HslComboBox({
                mostrarValor: false,
                appendTo: escopo.$CboExame.parent(),
                selected: function (event, ui) {
                    var item = $(ui.item).data('Item');
                    item.IdResumoAlta = escopo.Item.IdResumoAlta;
                    item.Data = escopo.TransformarDataJson(item.Data);
                    escopo.$CboExame.data('Item', item);
                }
            });
            this.$CboHoraTeleAlta.HslComboBox({
                mostrarValor: false,
                appendTo: escopo.$CboHoraTeleAlta.parent(),
                selected: function (event, ui) {
                    var item = $(ui.item).data('Item');
                    escopo.$TxtHoraTeleAlta.val(ui.item.innerText);
                    escopo.$TxtHoraAlta.val(escopo.$TxtHoraTeleAlta.val());
                    escopo.$CboHoraTeleAlta.data('Item', item);
                }
            });




            this.$TextAreaMaxLength.bind('input propertychange', function () {
                var maxLength = $(this).attr('length');
                if ($(this).val().length > maxLength) {
                    $(this).val($(this).val().substring(0, maxLength));
                }
            });

            // Define mascará para horário de alta.
            this.$TxtHoraAlta.setMask({ mask: '99:99' });
            //this.$TxtHoraTeleAlta.setMask({ mask: '99:99' });
            this.$TxtTelefoneMedico.setMask("99 (99) 99999-9999n");

            escopo.CarregarCalendario();
        },

        CarregarCalendario: function () {
            try {
                var $arrTxtData = [this.$TxtDataProcedimentoCirurgico, this.$TxtDataAlta, this.$TxtDataTeleAlta];
                var $arrLnkCalendario = [this.$LnkCalendarioProcedimentoCirurgico, this.$LnkCalendarioDataAlta, this.$LnkCalendarioDataTeleAlta];

                $($arrTxtData).each(function (index, item) {
                    $(item).datepicker({
                        showOn: '',
                        onSelect: function (data) {
                            $(this).parent().next('.hora').children('input').focus();
                            if (this.id == 'txtDataAlta') {
                                var escopo = Global.ResumoAlta;
                                escopo.$TxtDataTeleAlta.val(data);
                                escopo.RetornarHorariosDisponiveis(Js.Util.TextoParaData(data));
                            }
                        },
                        changeMonth: true,
                        changeYear: true
                    });
                    $(item).setMask({ mask: '99/99/9999' });
                });

                $($arrLnkCalendario).each(function (index, item) {
                    $(item).click(function () {
                        $($arrTxtData[index]).datepicker('show');
                    });
                });
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.CarregarCalendario', ex.message, false, ex, arguments);
            }
        },

        AdicionarOutroDiagnostico: function (load, item) {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                if (!load) item = {
                    IdOutroDiagnostico: 0,
                    IdResumoAlta: escopo.Item.IdResumoAlta,
                    Descricao: escopo.$TxtOutrosDiagnosticos.val()
                };;

                var $tbody = this.$LstOutrosDiagnosticos.find('tbody');
                if ($tbody.find('[IdDiagnostico="' + item.IdDiagnostico + '"]').length == 0) {
                    var $novaLinha = $tbody.find('.template').clone().removeClass('template');
                    var indiceAtual = $tbody.find('tr').length - 2;
                    if (indiceAtual % 2 == 0) {
                        $novaLinha.addClass('alt');
                    }
                    else {
                        $novaLinha.removeClass('alt');
                    }
                    $novaLinha.data('Item', item);
                    if (item.Codigo) {
                        item.Descricao = item.Codigo + ' - ' + item.Descricao;
                    }
                    $novaLinha.find('.spnNome').html(item.Descricao);

                    $novaLinha.find('.btRemoverVermelho').click(function (event) {
                        escopo.RemoverLinhaTabela(event.target);
                    });

                    $tbody.append($novaLinha);

                    this.DimensionarTabela($tbody);

                    this.$TxtOutrosDiagnosticos.val('');

                    if (!load) {
                        this.$TxtOutrosDiagnosticos.focus();
                    }
                }
                else {
                    alert('Diagnóstico já inserido.');
                }
            }
            catch (ex) {
                Js.Util.ReportarErro('Js.DescCirurgicaCadastro.AdicionarOutroDiagnostico', ex.message, false, ex, arguments);
            }
        },

        AdicionarProcedimentoCirurgico: function (load, item) {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                if (!load) item = this.$ProcedimentoCirurgicoSelecionado;

                if (item) {
                    if (!load) {
                        item.Data = Js.Util.TextoParaData(this.$TxtDataProcedimentoCirurgico.val());
                    }

                    var $tbody = this.$LstProcedimentosCirurgicos.find('tbody');
                    var $novaLinha = $tbody.find('.template').clone().removeClass('template');
                    var indiceAtual = $tbody.find('tr').length - 2;
                    if (indiceAtual % 2 == 0) {
                        $novaLinha.addClass('alt');
                    }
                    else {
                        $novaLinha.removeClass('alt');
                    }
                    $novaLinha.data('Item', item);
                    $novaLinha.find('.spnProcedimento').html(item.Descricao);
                    $novaLinha.find('.spnData').html(Js.Util.DataParaTexto(item.Data));

                    $novaLinha.find('.btRemoverVermelho').click(function (event) {
                        escopo.RemoverLinhaTabela(event.target);
                    });

                    $tbody.append($novaLinha);

                    this.DimensionarTabela($tbody);
                    this.$TxtProcedimentoCirurgico
                        .data('Item', null)
                        .val('');

                    if (!load) {
                        this.$TxtProcedimentoCirurgico.focus();
                    }
                    this.$TxtDataProcedimentoCirurgico.val('');
                }
                else {
                    alert('Dados incompletos.');
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.AdicionarProcedimentoCirurgico', ex.message, false, ex, arguments);
            }
        },

        AdicionarExame: function (item, load) {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var $tbody = this.$LstExames.find('tbody');

                var $novaLinha = $tbody.find('.template').clone().removeClass('template');
                var indiceAtual = $tbody.find('tr').length - 2;
                if (indiceAtual % 2 == 0) {
                    $novaLinha.addClass('alt');
                }
                else {
                    $novaLinha.removeClass('alt');
                }
                $novaLinha.data('Item', item);
                if (item.PermitirSelecionarExame) {
                    var $link = $('<a></a>')
                        .addClass('descricaoExame')
                        .html(item.Descricao)
                        .attr('chave', item.SequenciaLaudo + '|' + item.Tipo + '|' + escopo.CodigoPessoa + '|' + item.NrPrescricao + '|' + item.Sequencia + '|' + item.AccessionNumber + '|' + item.StatusLaudo + '||False')
                        .attr('title', 'Abrir Laudo');
                    $link.click(function (event) { escopo.MostrarLaudoExame(event.target); });
                    $novaLinha.find('.spnExame').append($link);
                }
                else {
                    var $descricao = $('<span></span>').html(item.Descricao).addClass('descricaoExame').addClass('aviso').attr('title', item.Status);
                    $novaLinha.find('.spnExame').append($descricao);
                }
                if (item.PermitirSelecionarExameImagem) {
                    var $link = $('<a></a>').addClass('btExameImagens').attr('title', 'Abrir Imagem').click(function () {
                        escopo.ExibirImagens(item.AccessionNumber);
                    });
                    $novaLinha.find('.colBtImagem').append($link);
                }
                else {
                    $novaLinha.find('.colExame').attr('colspan', '2');
                    $novaLinha.find('.colBtImagem').remove();
                }

                $novaLinha.find('.spnData').html(Js.Util.DataParaTexto(item.Data));

                $novaLinha.find('.btRemoverVermelho').click(function (event) {
                    escopo.RemoverLinhaTabela(event.target);
                });

                $tbody.append($novaLinha);

                this.DimensionarTabela($tbody);

                this.$CboExame
                    .data('Item', null)
                    .val('');
                this.$CboExame.HslComboBox('updateValue', '');
                if (!load) {
                    this.$CboExame.focus();
                }
                this.$TxtDataProcedimentoCirurgico.val('');
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.AdicionarExame', ex.message, false, ex, arguments);
            }
        },

        AdicionarMedicacao: function (item, lstMedicacoes, txtMedicacao, load) {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var $LstMedicacoes = $(lstMedicacoes);
                var $TxtMedicacao = $(txtMedicacao);
                var $tbody = $LstMedicacoes.find('tbody');
                if (item == null) {
                    item = {
                        IdMedicamento: 0,
                        IdResumoAlta: escopo.Item.IdResumoAlta,
                        Codigo: '',
                        Descricao: $TxtMedicacao.val()
                    };
                }
                if (($TxtMedicacao.val().length > 0) || load) {
                    if ($tbody.find('[IdMedicacao="' + item.IdMedicacao + '"]').length == 0) {
                        var $novaLinha = $tbody.find('.template').clone().removeClass('template');
                        var indiceAtual = $tbody.find('tr').length - 2;
                        if (indiceAtual % 2 == 0) {
                            $novaLinha.addClass('alt');
                        }
                        else {
                            $novaLinha.removeClass('alt');
                        }
                        $novaLinha.data('Item', item);
                        $novaLinha.find('.spnMedicacao').html(item.Descricao);

                        $novaLinha.find('.btRemoverVermelho').click(function (event) {
                            escopo.RemoverLinhaTabela(event.target);
                        });

                        $tbody.append($novaLinha);

                        this.DimensionarTabela($tbody);

                        $TxtMedicacao
                            .data('Item', null)
                            .val('');
                        if (!load) {
                            $TxtMedicacao.focus();
                        }
                    }
                    else {
                        alert('Medicação já inserida.');
                    }
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.AdicionarMedicacao', ex.message, false, ex, arguments);
            }
        },

        ExibirOpcaoSaidaAlta: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo)
                    escopo = this;

                escopo.$RbtTipoSaidaAlta.prop('checked') ? escopo.$SpanSaidaAlta.show() : escopo.$SpanSaidaAlta.hide();
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ExibirOpcaoSaidaAlta', ex.message, false, ex, arguments);
            }
        },

        CarregarTabelaSemItens: function (tabela) {
            try {
                var $tbody = $(tabela).find('tbody');
                var qtdItensTabela = $tbody.find('tr:not(.template):not(.semItens)').length;

                if (qtdItensTabela == 0) {
                    $tbody.children('tr.semItens').show();
                } else {
                    $tbody.children('tr.semItens').hide();
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.CarregarTabelaSemItens', ex.message, false, ex, arguments);
            }
        },

        MostrarLaudoExame: function (link) {
            var $link = $(link);
            var escopo = this;

            //loadingAbrir();
            Js.Util.Post('SelecionarExames', { chave: $link.attr('chave') },
                function (data) {
                    dadosRetorno = data.d;

                    Js.Util.DefinirEscopoValidacao(escopo);
                    Js.Util.FecharNotificacaoErro();
                    Js.Util.FecharNotificacaoInfo();

                    if (dadosRetorno) {
                        var $altura = Math.floor($(window).height() * 0.95);
                        AbrirModal('/exames_laudo_pop.aspx', null, 980, $altura, true, 'Resultado de Exames', ['center', 5], 'divLaudos');
                    }

                },
                function (data) {
                    loadingFechar();
                });
        },

        ExibirImagens: function (accessionNumber) {
            try {
                var urlRedirectExameImagem = this.UrlRedirectExameImagem;
                urlRedirectExameImagem = urlRedirectExameImagem.replace('[ACCESSION]', encodeURIComponent(accessionNumber));
                Js.ProntuarioUtil.AbrirPopExameImagem(urlRedirectExameImagem);
            } catch (ex) {
                Js.Util.TratarErro('Js.ResumoAlta.ExibirImagens', ex.message);
                return false;
            }
        },

        DimensionarTabela: function (tabela) {
            try {
                var escopo = this;
                var $containerLista = $(tabela).closest('.containerLista');
                var $divTabelaHeader = $containerLista.find('.divTabelaHeader');
                var $divTabelaBody = $containerLista.find('.divTabelaCorpo');
                var $tabela = $containerLista.find('.tabelaDados');

                escopo.CarregarTabelaSemItens(tabela);

                var overflow = Js.Util.CongelarCabecalho($containerLista, $divTabelaHeader, $divTabelaBody, $tabela, true, 'tr');
                if (overflow) {
                    $divTabelaBody.height($divTabelaBody.height() - $divTabelaHeader.find('tr').height());
                } else {
                    $divTabelaBody.css('height', '');
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.DimensionarTabela', ex.message, false, ex, arguments);
            }
        },

        RemoverLinhaTabela: function (btRemover) {
            try {
                var escopo = this;
                var $tr = $(btRemover).parent().parent();
                var $tbody = $tr.parent();
                $tr.remove();
                escopo.ReordenarCoresLinhaTabela($tbody);
                escopo.DimensionarTabela($tbody);
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.RemoverLinhaTabela', ex.message, false, ex, arguments);
            }
        },

        ReordenarCoresLinhaTabela: function (TblBody) {
            try {
                var $itensTabela = TblBody.find('tr:not(.template):not(.semItens)');

                $itensTabela.each(function (index, item) {
                    if (($itensTabela.index(item) % 2) != 0) {
                        $(item).removeClass('alt');
                    } else {
                        $(item).addClass('alt');
                    }
                });
            } catch (ex) {
                Js.Util.ReportarErro('Js.Anamnese.ReordenarCoresLinhaTabela', ex.message, false, ex, arguments);
            }
        },

        ControlarVisibilidade: function (controle, itensAExibir, itensAEsconder) {
            $(controle).each(function (i, v) {
                $(v).click(function () {
                    $(itensAEsconder).each(function (j, w) { $(w).hide(); });
                    $(itensAExibir).each(function (k, x) { $(x).show(); });
                })
            });
        },

        RedimensionarTela: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) {
                    escopo = this;
                }

                //Redimensiona altura frame e posição do rodapé com botões.
                var $inicioForm = this.$Principal.position().top,
                    $alturaRodape = this.$DivBotoes.outerHeight(),
                    $margemForm = this.$Principal.outerHeight(true) - this.$Principal.height(),
                    $alturaTela = $(window).height(),
                    $alturaForm = $alturaTela - $inicioForm - $alturaRodape - $margemForm;

                this.$Principal.height($alturaForm);
                this.$Form.height($alturaForm - 35);
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.RedimensionarTela', ex.message, false, ex, arguments);
            }
        },

        TransformarDataJson: function (dataInicial) {
            try {
                if (!dataInicial) {
                    return '';
                }

                var data = dataInicial.replace(/\/Date\(/, '').replace(/\)\//, '');
                data = new Date(parseInt(data));

                return data;
            } catch (ex) {
                Js.Util.ReportarErro('Js.OutrosDocumentosUtil.FormatarDataTabela', ex.message, false, ex, arguments);
            }
        },

        //TeleAlta
        ValidarHoraTeleAlta: function () {
            var valido = true;
            var escopo = Global.ResumoAlta;
            if (escopo.$CheckTelealta.is(':checked')) {
                if (escopo.$TxtHoraTeleAlta.val() == '') {
                    Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                    Js.Util.FecharNotificacaoErro();
                    Js.Util.FecharNotificacaoInfo();
                    Js.Util.AdicionarErro($('#cboHoraTeleAlta_txt'), 'Necessário preencher a hora da Telealta');
                    loadingFechar();
                    Js.Util.MostrarNotificacaoErro('center');
                    valido = false;
                }
            }
            return valido;
        },

        Validar: function () {
            var valido = true;
            var escopo = this;
            Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
            Js.Util.FecharNotificacaoErro();
            Js.Util.FecharNotificacaoInfo();

            if (escopo.$TxtHistoricoInternacao.val() == '') {
                Js.Util.AdicionarErro(this.$TxtHistoricoInternacao, 'Necessário preencher o histórico da internação');
                valido = false;
            }

            if (!Js.Util.ValidarCampoRequerido(escopo.$TxtDiagnosticoPrincipal, 'Necessário preencher o diagnóstico principal')) {
                valido = false;
            }

            if (escopo.$TxtDataAlta.val() == '') {
                Js.Util.AdicionarErro(this.$TxtDataAlta, 'Necessário preencher a data da alta');
                valido = false;
            }

            if (escopo.$TxtHoraAlta.val() == '') {
                Js.Util.AdicionarErro(this.$TxtHoraAlta, 'Necessário preencher a hora da alta');
                valido = false;
            }

            var TipoSaida = $('input[name="' + escopo.$RbtTipoSaidaAlta.attr('name') + '"]:checked').val();
            if (TipoSaida == 'T') {
                if (escopo.$TxtTransferenciaExterna.val() == '') {
                    Js.Util.AdicionarErro(this.$TxtTransferenciaExterna, 'Necessário preencher o destino da transferência externa');
                    valido = false;
                }
            }

            if (TipoSaida == 'A') {
                if ($.map(escopo.$RbtTipoSaidaOpcaoAlta, function (obj) {
                    if ($(obj).prop('checked')) return [$(obj).val()];
                }).length == 0) {
                    Js.Util.AdicionarErro(this.$DivRbtlTipoSaidaOpcaoAlta, 'Necessário preencher o tipo de alta');
                    valido = false;
                }
            }

            //TeleAlta
            if (this.$CheckTelealta.is(':checked')) {
                if (this.$TxtHoraTeleAlta.val() == '') {
                    Js.Util.AdicionarErro($('#cboHoraTeleAlta_txt'), 'Necessário preencher a hora da Telealta');
                    valido = false;
                }
                if (this.$TxtEmailMedico.val() == '') {
                    Js.Util.AdicionarErro($('#txtEmailMedico'), 'Necessário preencher o e-mail');
                    valido = false;
                }
                else if (!Js.Util.ValidarEmail(this.$TxtEmailMedico.val())) {
                    Js.Util.AdicionarErro($('#txtEmailMedico'), 'E-mail em formato inválido');
                    valido = false;
                }
                if (this.$TxtTelefoneMedico.val() == '') {
                    Js.Util.AdicionarErro($('#txtTelefoneMedico'), 'Necessário preencher o telefone');
                    valido = false;
                }
                else if (!Js.Util.ValidarTelefone(this.$TxtTelefoneMedico.val().replace(/[^0-9]/g, ''))) {
                    Js.Util.AdicionarErro($('#txtTelefoneMedico'), 'Telefone em formato inválido');
                    valido = false;
                }
            }

            if (!valido) {
                //Loading aberto ao iniciar o médoto salvar.
                loadingFechar();
                Js.Util.MostrarNotificacaoErro('center');
            }

            return valido;
        },

        RetornarHorariosDisponiveis: function (dataTelealta) {
            try {
                if (this.$CheckTelealta.is(':checked')) {
                    var escopo = Global.ResumoAlta;
                    var dataTeleAlta = new Date(dataTelealta.getTime());
                    var params = { dataAlta: JSON.stringify(dataTeleAlta) };
                    loadingAbrir();
                    Js.Util.Post(
                        'RetornarHorariosDisponiveis',
                        params,
                        function (data) {
                            var dadosRetorno = data.d;
                            loadingFechar();
                            if (dadosRetorno.Sucesso) {
                                escopo.HorariosDisponiveis = dadosRetorno.Dados;
                                escopo.CarregarComboHoraTeleAlta();
                                if (escopo.HorariosDisponiveis.length == 0) {
                                    Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                                    Js.Util.FecharNotificacaoErro();
                                    Js.Util.FecharNotificacaoInfo();
                                    Js.Util.AdicionarErro($('#cboHoraTeleAlta_txt'), 'Não há horários disponíveis para a data selecionada!');
                                    Js.Util.MostrarNotificacaoErro('center');
                                }
                            } else {
                                Js.Util.MostrarNotificacaoErroLinha('<br />Data de Alta não informada! <br />', 10000);
                                Js.Util.TratarErro('Js.ResumoAlta.RetornarHorariosDisponiveis.ChamadaAjax', dadosRetorno.Mensagem);
                            }
                        }
                    );
                }
                } catch (ex) {
                    Js.Util.ReportarErro('Js.ResumoAlta.ValidarHorarioDisponivel', ex.message, false, ex, arguments);
                    loadingFechar();
                }
        },

        ValidarHorarioDisponivel: function (liberar,callback) {
            try {
                var escopo = Global.ResumoAlta;
                if (!liberar || !escopo.TeleAltaHabilitado) {
                    callback();
                    return;
                }
                var dataTelealta = null;
                var valido = this.$TxtDataTeleAlta.val();
                if (valido) {
                    dataTelealta = Js.Util.TextoParaData(this.$TxtDataTeleAlta.val());

                    if (this.$TxtHoraTeleAlta.val()) {
                        dataTelealta.setHours(Js.Util.RetornarHoras(this.$TxtHoraTeleAlta.val()));
                        dataTelealta.setMinutes(Js.Util.RetornarMinutos(this.$TxtHoraTeleAlta.val()));
                    }
                    var dataTeleAlta = new Date(dataTelealta.getTime());
                    var params = { dataAlta: JSON.stringify(dataTeleAlta) };
                    //loadingAbrir();
                    Js.Util.Post(
                        'ValidarHorarioDisponivel',
                        params,
                        function (data) {
                            var dadosRetorno = data.d;
                            //loadingFechar();
                            if (dadosRetorno.Sucesso) {
                                var retornoHorarioDisponivel = dadosRetorno.Dados;
                                if (retornoHorarioDisponivel.Disponivel) {
                                    callback();
                                } else {
                                    Js.Util.AdicionarErro(this.$DivRbtlTipoSaidaOpcaoAlta, retornoHorarioDisponivel.Mensagem);
                                    Js.Util.MostrarNotificacaoErro('center');
                                }
                            } else {
                                Js.Util.MostrarNotificacaoErroPadrao();
                                Js.Util.TratarErro('Js.ResumoAlta.ValidarHorarioDisponivel.ChamadaAjax', dadosRetorno.Mensagem);
                            }
                        }
                    );
                }
                else {
                    if (liberar) {
                        callback();
                    }
                }

            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarHorarioDisponivel', ex.message, false, ex, arguments);
                //loadingFechar();
            }

        },

        Salvar: function (liberar) {

            var escopo = this;

            if (!escopo.ValidarHoraTeleAlta()) {
                return;
            }

            var escopoPai = parent.Js.Util.Escopo;
            Js.Util.ValidarSessaoUsuario(escopoPai.IdPaciente);

            loadingAbrir();

            var valido = true;
            if (liberar) {
                valido = escopo.Validar();
            }

            if (valido) {
                this.ValidarHorarioDisponivel(liberar,function () {
                    try {
                        var tipoSaida = $('input[name="' + escopo.$RbtTipoSaidaAlta.attr('name') + '"]:checked').val();
                        var tipoSaidaOpcaoAlta = tipoSaida == 'A' ? $.map(escopo.$RbtTipoSaidaOpcaoAlta, function (obj) {
                            if ($(obj).prop('checked')) return [$(obj).val()];
                        }) : [];

                        var dados = {
                            IdResumoAlta: escopo.Item.IdResumoAlta,
                            IdAtendimento: escopo.IdAtendimento,
                            MotivoInternacao: escopo.$TxtMotivoInternacao.val(),
                            DiagnosticoPrincipal: escopo.$TxtDiagnosticoPrincipal.val(),
                            Intercorrencias: escopo.$RbtIntercorrenciasSim.is(':checked'),
                            DescIntercorrencias: escopo.$TxtIntercorrencias.val(),
                            Tratamento: escopo.$TxtTratamento.val(),
                            HistoricoInternacao: escopo.$TxtHistoricoInternacao.val(),
                            Antibiotico: escopo.$RbtAntibioticosSim.is(':checked'),
                            DescAntibioticoAlta: escopo.$TxtAntibioticos.val(),
                            MedicamentoAlta: escopo.$RbtMedicacaoAltaSim.is(':checked'),
                            DescMedicamentoAlta: escopo.$TxtMedicacaoAlta.val(),
                            RestricaoAtividade: escopo.$RbtRestricaoAtividadeFisicaSim.is(':checked'),
                            DescRestricaoAtividade: escopo.$TxtRestricaoAtividadeFisica.val(),
                            DietaEspecial: escopo.$RbtDietaEspecialSim.is(':checked'),
                            DescDietaEspecial: escopo.$TxtDietaEspecial.val(),
                            OutrasOrientacoes: escopo.$RbtOutrasOrientacoesSim.is(':checked'),
                            DescOutrasOrientacoes: escopo.$TxtOutrasOrientacoes.val(),
                            TipoSaida: tipoSaida,
                            TipoSaidaAlta: tipoSaidaOpcaoAlta.length ? tipoSaidaOpcaoAlta[0] : null,
                            TransferenciaExterna: (tipoSaida == 'T') ? escopo.$TxtTransferenciaExterna.val() : null,
                            MotivoSaida: (tipoSaida != 'O') ? $('input[name="' + escopo.$MotivoSaidaAlta.find('input[type="radio"]').attr('name') + '"]:checked').val() : null,
                            TipoObito: (tipoSaida == 'O') ? $('input[name="' + escopo.$MotivoSaidaObito.find('input[type="radio"]').attr('name') + '"]:checked').val() : null,
                            Necropsia: (tipoSaida == 'O') ? escopo.$RbtNecropsiaSim.is(':checked') : null,

                            CodMedico: '',
                            Usuario: '',
                            Ativo: true,
                            OutrosDiagnosticos: escopo.RetornarItensLista(escopo.$LstOutrosDiagnosticos),
                            Exames: escopo.RetornarItensLista(escopo.$LstExames),
                            Procedimentos: escopo.RetornarItensLista(escopo.$LstProcedimentosCirurgicos),
                            MedicamentosAdministrados: escopo.RetornarItensLista(escopo.$LstPrincipaisMedicacoes),
                        };

                        var dataAlta = null;
                        // Tratar/validar Data início
                        if (escopo.$TxtDataAlta.val()) {
                            dataAlta = Js.Util.TextoParaData(escopo.$TxtDataAlta.val());

                            if (escopo.$TxtHoraAlta.val()) {
                                dataAlta.setHours(Js.Util.RetornarHoras(escopo.$TxtHoraAlta.val()));
                                dataAlta.setMinutes(Js.Util.RetornarMinutos(escopo.$TxtHoraAlta.val()));
                            }
                            dados.DataAlta = new Date(dataAlta.getTime());
                        }

                        if (escopo.TeleAltaHabilitado) {
                        var dataTelealta = null;
                            if (escopo.$TxtDataTeleAlta.val()) {
                                dataTelealta = Js.Util.TextoParaData(escopo.$TxtDataTeleAlta.val());

                                if (escopo.$TxtHoraTeleAlta.val()) {
                                    dataTelealta.setHours(Js.Util.RetornarHoras(escopo.$TxtHoraTeleAlta.val()));
                                    dataTelealta.setMinutes(Js.Util.RetornarMinutos(escopo.$TxtHoraTeleAlta.val()));
                            }
                            dados.DataTeleAlta = new Date(dataTelealta.getTime());
                            }
                            if(escopo.$CheckTelealta.is(':checked')){
                                dados.EmailMedico = escopo.$TxtEmailMedico.val();
                                dados.TelefoneMedico = escopo.$TxtTelefoneMedico.val().replace(/[^0-9]/g, '');
                                dados.NrSeqAgendaAltaDigital = escopo.$CboHoraTeleAlta.data('Item').Codigo;
                            }
                    }

                    var params = { Dados: JSON.stringify(dados), Liberar: liberar };

                        Js.Util.Post(
                            'Salvar',
                            params,
                            function (data) {
                                var dadosRetorno = data.d;
                                if (dadosRetorno.Sucesso) {
                                    escopo.Item.IdResumoAlta = dadosRetorno.Dados;
                                    if (!liberar) {
                                        escopo.$LnkExcluir.show();
                                        Js.Util.MostrarNotificacaoSucesso('Resumo de alta salvo com sucesso! Para liberá-lo, clique no botão Confirmar.');
                                    } else {
                                        Js.Util.MostrarNotificacaoSucesso('Resumo de alta liberado com sucesso!');
                                        escopo.Item.DataLiberacao = new Date();
                                        escopo.Autor = true;
                                        escopo.TravarCampos();
                                    }
                                    var status = (liberar) ? 'Liberado' : 'Salvo';
                                    var data = new Date();
                                    var dia = Js.Util.DataParaTexto(data);
                                    var hora = Js.Util.FormatarHorario(data);
                                    escopo.$DivStatusDesc.html(status + ' por <strong>' + escopo.Item.Medico + '</strong> no dia <strong>' + dia + ' às ' + hora + '</strong>');

                                    escopo.ExibirConfirmacaoNaoLiberado = (!liberar && !escopo.BloquearEdicao);
                                }
                                else {
                                    Js.Util.MostrarNotificacaoErroPadrao();
                                    Js.Util.TratarErro('Js.ResumoAlta.Salvar.ChamadaAjax', dadosRetorno.Mensagem);
                                }

                                loadingFechar();
                            });
                    }
                    catch (ex) {
                        Js.Util.ReportarErro('Js.ResumoAlta.Salvar', ex.message, false, ex, arguments);
                        loadingFechar();
                    }
                });
            }
        },

        VisualizarRelatorio: function () {

            try {

                if ((Global.ResumoAlta.Item.IdResumoAlta != '') && (Global.ResumoAlta.Item.IdResumoAlta > 0) && (Global.ResumoAlta.Item.DataLiberacao != null)) {
                    loadingAbrir();

                    Js.Util.DefinirEscopo(this);
                    Js.Util.AbrirModal(this.$DivModalImpressao,
                        '/pdfVisualizar.ashx?Tipo=4&Id=' + Global.ResumoAlta.Item.IdResumoAlta + '&QtdVias=1' + '&r=' + Math.random(),
                        'pdfVisualizar',
                        950, $(window).height() - 10, true, 'Resumo De Alta',
                        ['top', 'center'], 'pdfVisualizarashx', true);

                    loadingFechar();
                }
                else {
                    Js.Util.MostrarNotificacaoSucesso('Não há informações cadastradas para impressão do relatório!', 5000);
                }
            } catch (ex) {
                loadingFechar();
                Js.Util.TratarErro('Js.ResumoAlta.VisualizarRelatorio', ex.message);
                alert(ex.message);
            }
        },

        ImprimirRelatorio: function () {

            var escopoPai = parent.Js.Util.Escopo;
            Js.Util.ValidarSessaoUsuario(escopoPai.IdPaciente);

            try {
                if ((Global.ResumoAlta.Item.IdResumoAlta != '') && (Global.ResumoAlta.Item.IdResumoAlta > 0) && (Global.ResumoAlta.Item.DataLiberacao != null)) {
                    loadingAbrir();
                    Js.Util.Post('ImprimirRelatorio', { idResumoAlta: Global.ResumoAlta.Item.IdResumoAlta },
                        function (data) {

                            if (data.d.Sucesso == true && data.d.PossuiRetorno == true) {
                                var impressao;

                                try {
                                    impressao = new ActiveXObject("Impressao.ImprimirLocal");
                                }
                                catch (e) { }

                                if (impressao) {
                                    var dados = data.d.Dados.split(";");
                                    impressao.ImprimirArquivo(decodeURI(dados[0]), dados[1]);
                                }
                                Js.Util.MostrarNotificacaoSucesso('Impressão gerada com sucesso!', 3000);
                            } else {
                                Js.Util.MostrarNotificacaoErroPadrao('Erro ao gerar impressão!', 5000);
                            }
                            loadingFechar();
                        });
                } else {
                    Js.Util.MostrarNotificacaoSucesso('Não há informações cadastradas para impressão do relatório!', 5000);
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ImprimirRelatorio', ex.message, false, ex, arguments);
            }
        },

        Remover: function (liberar) {
            var escopo = this;

            var escopoPai = parent.Js.Util.Escopo;
            Js.Util.ValidarSessaoUsuario(escopoPai.IdPaciente);

            var acao = 'remover';
            if (escopo.Item.DataLiberacao != null) {
                acao = 'suspender';
            }
            Js.Util.MostrarNotificacaoConfirmacao('Deseja ' + acao + ' esse resumo de alta?', function () {
                try {
                    loadingAbrir();
                    var params = { IdResumoAlta: JSON.stringify(escopo.Item.IdResumoAlta) };

                    Js.Util.Post(
                        'Remover',
                        params,
                        function (data) {
                            var dadosRetorno = data.d;
                            if (dadosRetorno.Sucesso) {
                                escopo.Item.IdResumoAlta = dadosRetorno.Dados;
                                acao = 'removido';
                                if (escopo.Item.DataLiberacao != null) {
                                    acao = 'suspenso';
                                    var data = new Date();
                                    var dia = Js.Util.DataParaTexto(data);
                                    var hora = Js.Util.FormatarHorario(data);
                                    escopo.$DivStatusDesc.html('Suspenso por <strong>' + escopo.Item.Medico + '</strong> no dia <strong>' + dia + ' às ' + hora + '</strong>');
                                }
                                Js.Util.MostrarNotificacaoSucesso('Resumo de alta ' + acao + ' com sucesso!');
                                escopo.$LnkSalvar.hide();
                                escopo.$LnkLiberar.hide();
                                setTimeout(function () {
                                    location.href = 'resumo_alta.aspx';
                                }, 500);

                                escopo.ExibirConfirmacaoNaoLiberado = (!(escopo.Item.DataLiberacao != null) && !escopo.BloquearEdicao);
                            }
                            else {
                                if (dadosRetorno.Mensagem) {
                                    Js.Util.MostrarNotificacaoErroLinha(dadosRetorno.Mensagem, 5000);
                                } else {
                                    Js.Util.MostrarNotificacaoErroPadrao();
                                }
                                Js.Util.TratarErro('Js.ResumoAlta.Remover.ChamadaAjax', dadosRetorno.Mensagem);
                            }

                            loadingFechar();
                        }
                    );
                }
                catch (ex) {
                    Js.Util.ReportarErro('Js.ResumoAlta.Remover', ex.message, false, ex, arguments);
                    loadingFechar();
                }
            });
        },

        TravarCampos: function () {
            var escopo = this;
            Js.Util.DesabilitarCampos(escopo.$Form);
            escopo.$LnkSalvar.hide();
            escopo.$LnkLiberar.hide();
            $('.btRemoverVermelho').off('click').css('cursor', 'default');
            $('.btAdicionarVerde').off('click').css('cursor', 'default');
            $('.btCalendario').off('click').css('cursor', 'default');
            $([escopo.$TxtDiagnosticoPrincipal, escopo.$TxtOutrosDiagnosticos, escopo.$TxtMedicacao,
            escopo.$TxtMedicacaoAlta, escopo.$TxtProcedimentoCirurgico]).attr('disabled', 'disabled');
            escopo.$CboExame.HslComboBox('disable', true);
            escopo.$PerguntasColOpcao.off('click');
            escopo.$LnkImprimir.show();
            escopo.$LnkExcluir.hide();
            if (this.Autor) {
                escopo.$LnkSuspender.show();
            } else {
                escopo.$LnkSuspender.hide();
            }
        },

        CancelarAlteracoes: function (onConfirmed, onAbort) {
            Js.Util.MostrarNotificacaoConfirmacaoBase('RESUMO DE ALTA', 'O documento <strong>não foi liberado.</strong><br/>Deseja sair?',
                function () {
                    setTimeout(onConfirmed, 500);
                }, onAbort);
        },

        FecharPagina: function () {
            try {
                var escopo = this;
                var escopoPai = parent.Js.Util.Escopo;

                Js.Util.DefinirEscopo(escopo);

                if (this.ExibirConfirmacaoNaoLiberado) {
                    escopo.CancelarAlteracoes(function () {
                        escopoPai.AtualizarTabela();
                        escopoPai.EsconderMenu(false);
                        Js.Util.FecharModal();
                    });
                } else {
                    loadingAbrir();
                    escopoPai.AtualizarTabela();
                    escopoPai.EsconderMenu(false);
                    Js.Util.FecharModal();
                }
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.FecharPagina', ex.message, false, ex, arguments);
            }
        },

        RetornarItensLista: function (lista) {
            var retorno = [];
            $(lista).find('tr').each(function (i, v) {
                if ($(v).data('Item')) {
                    retorno.push($(v).data('Item'));
                }
            });
            return retorno;
        },

        ValidarExame: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var valido = true;
                Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                Js.Util.FecharNotificacaoErro();

                this.$DivErro.position({
                    of: escopo.$LnkAdicionarExame,
                    my: 'right-450 top-105',
                    at: 'left center'
                });

                if (!Js.Util.ValidarCampoRequerido(this.$CboExame, 'O exame invasivo não foi informado!')) {
                    valido = false;
                }

                if (!valido) {
                    Js.Util.MostrarNotificacaoErro();
                }

                return valido;
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarExame', ex.message, false, ex, arguments);
            }
        },

        ValidarMedicacao: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var valido = true;
                Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                Js.Util.FecharNotificacaoErro();

                this.$DivErro.position({
                    of: escopo.$LnkAdicionarMedicacao,
                    my: 'right-450 top-105',
                    at: 'left center'
                });

                if ($.trim(this.$TxtMedicacao.val()).length == 0 || this.$TxtMedicacao.val() == this.$TxtMedicacao.attr('placeholder')) {
                    Js.Util.AdicionarErro(this.$TxtMedicacao, 'O medicamento não foi informado!');
                    valido = false;
                }

                if (!valido) {
                    Js.Util.MostrarNotificacaoErro();
                }

                return valido;
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarMedicacao', ex.message, false, ex, arguments);
            }
        },

        ValidarMedicacaoAlta: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var valido = true;
                Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                Js.Util.FecharNotificacaoErro();

                this.$DivErro.position({
                    of: escopo.$LnkAdicionarMedicacaoAlta,
                    my: 'right-450 top-105',
                    at: 'left center'
                });

                if ($.trim(this.$TxtMedicacaoAlta.val()).length == 0 || this.$TxtMedicacaoAlta.val() == this.$TxtMedicacaoAlta.attr('placeholder')) {
                    Js.Util.AdicionarErro(this.$TxtMedicacaoAlta, 'O medicamento não foi informado!');
                    valido = false;
                }

                if (!valido) {
                    Js.Util.MostrarNotificacaoErro();
                }

                return valido;
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarMedicacaoAlta', ex.message, false, ex, arguments);
            }
        },

        ValidarOutroDiagnostico: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var valido = true;
                Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                Js.Util.FecharNotificacaoErro();

                this.$DivErro.position({
                    of: escopo.$LnkAdicionarOutroDiagnostico,
                    my: 'right center',
                    at: 'right+20 center'
                });

                if (!Js.Util.ValidarCampoRequerido(escopo.$TxtOutrosDiagnosticos, 'O diagnóstico não foi informado!')) {
                    valido = false;
                } else if (this.$TxtOutrosDiagnosticos.val().length < 3) {
                    Js.Util.AdicionarErro(this.$TxtOutrosDiagnosticos, 'O diagnóstico deve possuir três ou mais letras!');
                    valido = false;
                }


                if (!valido) {
                    Js.Util.MostrarNotificacaoErro();
                }

                return valido;
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarOutroDiagnostico', ex.message, false, ex, arguments);
            }
        },

        ValidarProcedimentoCirurgico: function () {
            try {
                var escopo = Global.ResumoAlta;
                if (!escopo) escopo = this;

                var valido = true;
                Js.Util.DefinirEscopoValidacao(Global.ResumoAlta);
                Js.Util.FecharNotificacaoErro();

                this.$DivErro.position({
                    of: escopo.$LnkAdicionarProcedimentoCirurgico,
                    my: 'right center',
                    at: 'right+20 center'
                });

                if (!this.$ProcedimentoCirurgicoSelecionado) {
                    Js.Util.AdicionarErro(this.$TxtProcedimentoCirurgico, 'O procedimento não foi informado!');
                    valido = false;
                }

                var dataProcedimento = Js.Util.TextoParaData(this.$TxtDataProcedimentoCirurgico.val());

                if (!Js.Util.ValidarCampoRequerido(this.$TxtDataProcedimentoCirurgico, 'A data do procedimento não foi informada!')) {
                    valido = false;
                } else if (!Js.Util.ValidarCampoData(this.$TxtDataProcedimentoCirurgico) || dataProcedimento.getTime() <= 0) {
                    Js.Util.AdicionarErro(this.$TxtDataProcedimentoCirurgico, 'Data do procedimento inválida!');
                    valido = false;
                }

                if (!valido) {
                    Js.Util.MostrarNotificacaoErro();
                }

                return valido;
            } catch (ex) {
                Js.Util.ReportarErro('Js.ResumoAlta.ValidarProcedimentoCirurgico', ex.message, false, ex, arguments);
            }
        },

        VerificarAnamnese: function () {
            var escopo = Global.ResumoAlta;
            if (!escopo) escopo = this;
            if (escopo.temAnamneseLiberada) {
                return;
            }

            var escopoPai = parent.Js.Util.Escopo;
            var mensagem =
                '<strong> Não existe Anamnese liberada para este atendimento.</strong > ' +
                '<br/><br/> Você será redirecionado.';

            var callback = function () {
                escopoPai.AbrirCadastro(null, escopoPai.TipoAvaliacao.Anamnese, escopo.IdAnamneseLiberada, null);
            };

            Js.Util.MostrarPopUpNotificacao('Resumo Alta', mensagem, callback, callback);
        }
    };

    return Js;
}(Js || {}));
