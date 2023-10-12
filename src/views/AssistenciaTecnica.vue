<template>
  <div class="assistenciaTecnica">
    <Navbar title="Assistência Técnica"/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row">
            <div class="col mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número da Assistência</span>
                <input class="form-control" type="text" v-model="numAss" ref="inputNumAss" disabled>
                <button id="btnBuscaAss" class="btn btn-secondary input-group-btn btn-busca" @click="buscarAss" data-bs-toggle="modal" data-bs-target="#assModal">...</button>
                <button id="btnIniciarAss" class="btn btn-secondary input-group-btn btn-busca" @click="iniciarAss">+</button>
              </div>
            </div>
            <div class="col-auto mb-2">
              <button class="float-end btn-sm btn btn-secondary btn-sm ms-2" type="button" @click="cancelar" :disabled="numRnc === ''">Cancelar</button>
              <button id="btnProcessar" class="float-end btn btn-secondary btn-sm" type="button" @click="enviarAss" ref="btnProcessar" :disabled="numRnc === ''">Processar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row">
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Nota Fiscal</span>
                <input class="form-control" type="text" v-model="numNfc" disabled placeholder="Clique ao lado para selecionar">
                <button id="btnBuscaNotas" class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="buscarNotas" data-bs-toggle="modal" data-bs-target="#notasFiscaisModal">...</button>
              </div>
            </div>
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Item da Nota</span>
                <input class="form-control" type="text" v-model="desIpc" disabled placeholder="Clique ao lado para selecionar">
                <button id="btnBuscaItensNF" class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === '' || numNfc === ''" @click="buscarItensNF" data-bs-toggle="modal" data-bs-target="#itensNotaModal">...</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Pedido</span>
                <input class="form-control" type="number" v-model="numPed" disabled>
                <button id="btnBuscaPedidos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarPedidos" :disabled="numAss === ''" data-bs-toggle="modal" data-bs-target="#pedidosModal">...</button>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Item</span>
                <input class="form-control sm" v-model="desSeqIpd" disabled>
                <button id="btnBuscaItens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarItens" :disabled="numAss === '' || numPed === ''" data-bs-toggle="modal" data-bs-target="#itensModal">...</button>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Sequência</span>
                <input class="form-control" type="number" v-model="seqIte" ref="inputSeqIte" :disabled="numAss === '' || numPed === '' || seqIpd === ''">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Representada</span>
                <input class="form-control sm" v-model="desRep" disabled>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cliente</span>
                <input class="form-control sm" v-model="desCli" disabled>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Anexos</span>
                <label class="btn btn-sm btn-action btn-secondary sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Upload de anexo(s)" v-bind:class="{ disabled: !assCarregada }">
                  <font-awesome-icon icon="file-upload"/><input type="file" ref="uploadArquivo" style="display: none;" @change="onUploadArquivo"/>
                </label>
                <button class="btn btn-sm btn-action btn-secondary sm" @click="download" data-bs-toggle="tooltip" data-bs-placement="top" title="Download de anexo(s)" :disabled="!assCarregada">
                  <font-awesome-icon icon="download"/>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Data de Abertura</span>
                <input id="datAbe" class="form-control" type="text" disabled :value="datAbe ? datAbe.toLocaleDateString('pt-BR') : ''">
                <button class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="selectDate('abe')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
              </div>
            </div>
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Data de Fechamento</span>
                <input id="datFec" class="form-control" type="text" disabled :value="datFec ? datFec.toLocaleDateString('pt-BR') : ''">
                <button class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="selectDate('fec')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Reclamação Cliente</span>
              <textarea class="form-control custom-control" v-model="recCli" ref="inputDesRnc" rows="2" maxlength="1999" style="resize:none" :disabled="numAss === ''"></textarea>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Avaliação Assistência</span>
              <textarea class="form-control custom-control" v-model="avaAss" ref="inputDesRnc" rows="2" maxlength="1999" style="resize:none" :disabled="numAss === ''"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Procedência</span>
                <select class="form-select" v-model="assPrc" :disabled="numAss === ''">
                  <option selected value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Frete</span>
                <select class="form-select" v-model="tipFre" :disabled="numAss === ''">
                  <option selected disabled value="">Selecione</option>
                  <option value="C">CIF</option>
                  <option value="F">FOB</option>
                  <option value="S">Sem Frete</option>
                  <option value="O">Correio</option>
                </select>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Área de Origem</span>
                <input id="oriRnc" class="form-control" type="text" disabled v-model="desOriRnc">
                <button id="btnBuscaOrigens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarOrigens" :disabled="numAss === ''" data-bs-toggle="modal" data-bs-target="#origensModal">...</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Solução</span>
                <select class="form-select" v-model="tipSol" :disabled="numAss === ''">
                  <option value="I">Interna</option>
                  <option value="E">Externa</option>
                </select>
              </div>
            </div>
            <div class="col-8 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cortesia</span>
                <select class="form-select" v-model="dscCrt" :disabled="numAss === ''">
                  <option selected disabled value="">Selecione</option>
                  <option value="Laercio Luis Coelho">Laercio Luis Coelho</option>
                  <option value="José Gruber Junior">José Gruber Junior</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Data de Chegada</span>
                <input id="datAbe" class="form-control" type="text" disabled :value="datChe ? datChe.toLocaleDateString('pt-BR') : ''">
                <button class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="selectDate('che')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
              </div>
            </div>
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número RNC</span>
                <input class="form-control" type="text" v-model="numRnc" ref="inputNumRnc" disabled>
                <button id="btnBuscaRncs" class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="buscarRncs" data-bs-toggle="modal" data-bs-target="#rncsModal">...</button>
                <button id="btnIniciarRncs" class="btn btn-secondary input-group-btn btn-busca" :disabled="numAss === ''" @click="iniciarRnc">+</button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Outras Observações</span>
              <textarea class="form-control custom-control" v-model="outObs" ref="inputDesRnc" rows="2" maxlength="1999" style="resize:none" :disabled="numAss === ''"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Notas -->
      <div class="modal fade" id="notasFiscaisModal" tabindex="-1" aria-labelledby="notasFiscaisModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="notasFiscaisModalLabel">Busca de Notas Fiscais</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalNotas"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="notasFiscais != null">
                <span>Filtrar Nota por: </span>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" v-on:change="zerarFiltro" type="radio" name="inlineRadioOptions" id="inlineRadioNota" value="nota" v-model="tipoFiltroNF">
                  <label class="form-check-label" for="inlineRadioNota">Número da Nota</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" v-on:change="zerarFiltro" type="radio" name="inlineRadioOptions" id="inlineRadioForn" value="forn" v-model="tipoFiltroNF">
                  <label class="form-check-label" for="inlineRadioForn">Nome do Fornecedor</label>
                </div>
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarNotas" v-model="notasFiscaisFiltro" placeholder="Digite para buscar a Nota na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Empresa</th>
                      <th class="sm-header" scope="col">Cód. Fornecedor</th>
                      <th class="sm-header" scope="col">Fornecedor</th>
                      <th class="sm-header" scope="col">Série</th>
                      <th class="sm-header" scope="col">Nota</th>
                      <th class="sm-header" scope="col">Data de Entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="nfRow in notasFiscaisFiltradas" :key="nfRow.CODEMP + nfRow.CODFOR + nfRow.CODSNF + nfRow.NUMNFC" class="mouseHover" @click="selectNota(nfRow)">
                      <th class="fw-normal sm" scope="row">{{ nfRow.CODEMP }}</th>
                      <th class="fw-normal sm">{{ nfRow.CODFOR }}</th>
                      <th class="fw-normal sm">{{ nfRow.NOMFOR }}</th>
                      <th class="fw-normal sm">{{ nfRow.CODSNF }}</th>
                      <th class="fw-normal sm">{{ nfRow.NUMNFC }}</th>
                      <th class="fw-normal sm">{{ nfRow.DATENT }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando Notas Fiscais ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Itens NF -->
      <div class="modal fade" id="itensNotaModal" tabindex="-1" aria-labelledby="itensNotaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="itensNotaModalLabel">Busca de Itens da Nota Fiscal</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalItensNF"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="itensNota != null">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Seq.</th>
                      <th class="sm-header" scope="col">Produto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ipcRow in itensNota" :key="ipcRow.SEQIPC" class="mouseHover" @click="selectItemNota(ipcRow)">
                      <th class="fw-normal sm" scope="row">{{ ipcRow.SEQIPC }}</th>
                      <th class="fw-normal sm">{{ ipcRow.CPLIPC }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando Itens da Nota Fiscal ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal RNCs -->
      <div class="modal fade" id="rncsModal" tabindex="-1" aria-labelledby="rncsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="rncsModalLabel">Busca de RNCs</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalRncs"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="rncs != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarRncs" v-model="rncsFiltro" placeholder="Digite para buscar a RNC na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Número</th>
                      <th class="sm-header" scope="col">Área de Origem</th>
                      <th class="sm-header" scope="col">Classificação</th>
                      <th class="sm-header" scope="col">Data Aud.</th>
                      <th class="sm-header" scope="col">Pedido</th>
                      <th class="sm-header" scope="col">Item</th>
                      <th class="sm-header" scope="col">Seq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="rncRow in rncsFiltradas" :key="rncRow.NUMRMC" class="mouseHover" @click="selectRnc(rncRow)">
                      <th class="fw-normal sm" scope="row">{{ rncRow.NUMRMC }}</th>
                      <th class="fw-normal sm">{{ rncRow.DESRGQ }}</th>
                      <th class="fw-normal sm">{{ rncRow.NOMARE }}</th>
                      <th class="fw-normal sm">{{ rncRow.DATAUD }}</th>
                      <th class="fw-normal sm">{{ rncRow.NUMPED }}</th>
                      <th class="fw-normal sm">{{ rncRow.SEQIPD }}</th>
                      <th class="fw-normal sm">{{ rncRow.SEQITE }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando RNCs ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Origens -->
      <div class="modal fade" id="origensModal" tabindex="-1" aria-labelledby="origensModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="origensModalLabel">Busca de Áreas de Origem para RNC</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalOrigens"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="origens != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarOrigens" v-model="origensFiltro" placeholder="Digite para buscar a origem na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Origem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="origemRow in origensFiltradas" :key="origemRow.CODRGQ" class="mouseHover" @click="selectOrigem(origemRow)">
                      <th class="fw-normal sm" scope="row">{{ origemRow.CODRGQ }}</th>
                      <th class="fw-normal sm">{{ origemRow.DESRGQ }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando origens ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Pedidos -->
      <div class="modal fade" id="pedidosModal" tabindex="-1" aria-labelledby="pedidosModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="pedidosModalLabel">Busca de Pedidos</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalPedidos"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="pedidos != null">
                <div class="mb-3" v-if="empresas != null">
                  <span>Selecione as empresas que deseja filtrar os pedidos:</span>
                  <div v-for="empresa in empresas" :key="empresa.CODEMP" class="custom-control custom-checkbox sm">
                    <input type="checkbox" class="custom-control-input" :id="'checkEmpresa'+empresa.CODEMP" @change="filtrarEmpresa(empresa)">
                    <label class="custom-control-label ps-1" :for="'checkEmpresa'+empresa.CODEMP">{{ empresa.CODEMP }} - {{ empresa.NOMEMP }}</label>
                  </div>
                </div>
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarPedidos" v-model="pedidosFiltro" placeholder="Digite para buscar o pedido na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Empresa</th>
                      <th class="sm-header" scope="col">Pedido Cliente</th>
                      <th class="sm-header" scope="col">Pedido Feeling</th>
                      <th class="sm-header" scope="col">Emissão</th>
                      <th class="sm-header" scope="col">Cliente</th>
                      <th class="sm-header" scope="col">Representada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pedidoRow in pedidosFiltrados.slice().reverse()" :key="pedidoRow.NUMPED" class="mouseHover" @click="selectPedido(pedidoRow)">
                      <th class="fw-normal sm" scope="row">{{ pedidoRow.CODEMP }}</th>
                      <th class="fw-normal sm">{{ pedidoRow.PEDCLI }}</th>
                      <th class="fw-normal sm">{{ pedidoRow.NUMPED }}</th>
                      <th class="fw-normal sm">{{ pedidoRow.DATEMI }}</th>
                      <th class="fw-normal sm">{{ pedidoRow.NOMCLI }}</th>
                      <th class="fw-normal sm">{{ pedidoRow.NOMREP }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando pedidos ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Itens do Pedido -->
      <div class="modal fade" id="itensModal" tabindex="-1" aria-labelledby="itensModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="itensModalLabel">Busca Itens do Pedido</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalItens"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="itens != null">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Item</th>
                      <th class="sm-header" scope="col">Produto</th>
                      <th class="sm-header" scope="col">Derivação</th>
                      <th class="sm-header" scope="col">Descrição</th>
                      <th class="sm-header" scope="col">Qtde</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="itemRow in itens" :key="itemRow.SEQIPD" class="mouseHover" @click="selectItem(itemRow)">
                      <th class="fw-normal sm" scope="row">{{ itemRow.SEQIPD }}</th>
                      <th class="fw-normal sm">{{ itemRow.CODPRO }}</th>
                      <th class="fw-normal sm">{{ itemRow.CODDER }}</th>
                      <th class="fw-normal sm">{{ itemRow.DSCPRO }}</th>
                      <th class="fw-normal sm">{{ itemRow.QTDPED }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando itens ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal DatePicker -->
      <div class="modal fade" id="datePickerModal" tabindex="-1" aria-labelledby="datePickerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="datePickerModalLabel">Selecione uma data</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDatePicker"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 d-flex justify-content-center">
                <DatePicker v-if="datClick === 'abe'" v-model="dateAbePicked" mode="date" locale="br"/>
                <DatePicker v-else-if="datClick === 'fec'" v-model="dateFecPicked" mode="date" locale="br"/>
                <DatePicker v-else-if="datClick === 'che'" v-model="dateChePicked" mode="date" locale="br"/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  name: 'AssistenciaTecnica',
  components: { Navbar, DatePicker },
  computed: {
    dateAbePicked: {
      get() {
        return this.datAbe
      },
      set(v) {
        this.datAbe = v
        document.getElementById('closeModalDatePicker').click()
      }
    },
    dateFecPicked: {
      get() {
        return this.datFec
      },
      set(v) {
        this.datFec = v
        document.getElementById('closeModalDatePicker').click()
      }
    },
    dateChePicked: {
      get() {
        return this.datChe
      },
      set(v) {
        this.datChe = v
        document.getElementById('closeModalDatePicker').click()
      }
    },
  },
  data () {
    return {
      api_url: '',
      token: '',
      numAss: '1',
      codEmp: '',
      codFil: '',
      codFor: '',
      snfNfc: '',
      numNfc: '',
      seqIpc: '',
      cplIpc: '',
      desIpc: '',
      empNfv: '',
      filNfv: '',
      snfNfv: '',
      numNfv: '',
      seqIpv: '',
      notasFiscais: null,
      notasFiscaisFiltradas: null,
      notasFiscaisFiltro: '',
      itensNota: null,
      tipoFiltroNF: null,
      pedidosFiltro: '',
      pedidosFiltrados: null,
      pedidos: null,
      empresas: null,
      empresasFiltro: [],
      itens: null,
      numPed: '',
      empPed: '',
      seqIpd: '',
      desSeqIpd: '',
      maxSeqIte: '',
      seqIte: '',
      desRep: '',
      desCli: '',
      assCarregada: false,
      datAbe: '',
      datFec: '',
      datClick: '',
      recCli: '',
      avaAss: '',
      outObs: '',
      assPrc: '',
      tipFre: '',
      numOri: '',
      desOriAss: '',
      dscCrt: '',
      datChe: '',
      origens: null,
      origensFiltradas: null,
      origensFiltro: '',
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')
    this.checkAccess()
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$refs.inputNumAss.focus()
    }
  },
  methods: {
    checkAccess() {
      axios.get(this.api_url + '/telasDisponiveis?token=' + this.token + '&tela=COM-AST')
      .then((response) => {
        if (response.data === 'Tela não encontrada' || response.data.telas[0] !== 'COM-AST') {
          alert('Você não tem acesso à esta tela, e será redirecionado ao menu anterior')
          this.$router.push({ name: 'Menu' })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    checkInvalidLoginResponse (response) {
      if (response === 'Token inválido.') {
        alert('Seu token de acesso não é mais válido. É necessário fazer login novamente.')
        sessionStorage.removeItem('token')
        this.$router.push({ name: 'Login' })
      }
    },
    selectDate (model) {
      this.datClick = model
    },
    buscarNotas () {
      this.notasFiscaisFiltro = ''
      this.notasFiscais = null
      this.notasFiscaisFiltradas = null
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaNotas').disabled = true
      axios.get(this.api_url + '/notasFiscais?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.notasFiscais = response.data.notas
          this.notasFiscaisFiltradas = response.data.notas
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaNotas').disabled = false
        })
    },
    filtrarNotas () {
        if (this.tipoFiltroNF === 'nota') {
          this.notasFiscaisFiltradas = this.notasFiscais.filter(nota => nota.NUMNFC.toUpperCase().startsWith(this.notasFiscaisFiltro.toUpperCase()))
        } else if (this.tipoFiltroNF === 'forn') {
          this.notasFiscaisFiltradas = this.notasFiscais.filter(nota => nota.NOMFOR.toUpperCase().startsWith(this.notasFiscaisFiltro.toUpperCase()))
        }   
    },
    zerarFiltro () {
      this.notasFiscaisFiltro = ''
      this.notasFiscaisFiltradas = this.notasFiscais
    },
    selectNota (nota) {
      this.codEmp = nota.CODEMP
      this.codFil = nota.CODFIL
      this.codFor = nota.CODFOR
      this.snfNfc = nota.CODSNF
      this.numNfc = nota.NUMNFC

      this.seqIpc = ''
      this.cplIpc = ''
      this.desIpc = ''
      this.empNfv = ''
      this.filNfv = ''
      this.snfNfv = ''
      this.numNfv = ''
      this.seqIpv = ''
      document.getElementById('closeModalNotas').click()
    },
    buscarItensNF () {
      this.itensNota = null
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaItensNF').disabled = true
      axios.get(this.api_url + '/itensNota?token=' + this.token + '&codEmp=' + this.codEmp + '&codFil=' + 
                this.codFil + '&codFor=' + this.codFor + '&numNfc=' + this.numNfc + '&codSnf=' + this.snfNfc)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.itensNota = response.data.itens
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaItensNF').disabled = false
        })
    },
    selectItemNota (item) {
      this.seqIpc = item.SEQIPC
      this.cplIpc = item.CPLIPC
      this.desIpc = item.SEQIPC + ' - ' + item.CPLIPC
      this.empNfv = item.EMPNFV
      this.filNfv = item.FILNFV
      this.snfNfv = item.SNFNFV
      this.numNfv = item.NUMNFV
      this.seqIpv = item.SEQIPV
      document.getElementById('closeModalItensNF').click()

      if (this.numPed === '') {
        console.log('buscar pedido')
        this.buscarPedidoBaseadoEmNota()
      }
    },
    buscarPedidoBaseadoEmNota() {
      axios.get(this.api_url + '/pedidoPorNota?token=' + this.token + '&codEmp=' + this.codEmp + '&codFil=' + 
                this.codFil + '&snfNfv=' + this.snfNfv + '&numNfv=' + this.numNfv + '&seqIpv=' + this.seqIpv)
      .then((response) => {
        alert('Pedido correspondente encontrado! Os dados foram preenchidos automaticamente.')
        this.checkInvalidLoginResponse(response.data)
        this.numPed = response.data.pedido[0].NUMPED
        this.empPed = this.codEmp
        this.desCli = response.data.pedido[0].NOMCLI
        this.desRep = response.data.pedido[0].NOMREP
        this.seqIpd = response.data.pedido[0].SEQIPD
        this.desSeqIpd = response.data.pedido[0].SEQIPD + ' - ' + response.data.pedido[0].DSCPRO
        this.maxSeqIte = response.data.pedido[0].QTDPED
      })
      .catch((err) => {
        console.log(err)
      })
    },
    iniciarCampos () {
    },
    cancelar () {
      this.iniciarCampos()
    },
    buscarPedidos () {
      this.pedidos = null
      this.pedidosFiltro = ''
      this.empresas = null
      this.empresasFiltro = []
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaPedidos').disabled = true
      axios.get(this.api_url + '/pedidos?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.pedidos = response.data.pedidos
          this.pedidosFiltrados = response.data.pedidos
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaPedidos').disabled = false
        })

      axios.get(this.api_url + '/empresas?token=' + this.token)
      .then((response) => {
        this.checkInvalidLoginResponse(response.data)
        this.empresas = response.data.empresas
      })
      .catch((err) => {
        console.log(err)
      })
    },
    filtrarPedidos () {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.NUMPED.toUpperCase().startsWith(this.pedidosFiltro.toUpperCase()))
      if (this.empresasFiltro.length) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => this.empresasFiltro.includes(pedido.CODEMP))
      }
    },
    selectPedido (pedido) {
      this.numPed = pedido.NUMPED
      this.empPed = pedido.CODEMP
      this.desCli = pedido.NOMCLI
      this.desRep = pedido.NOMREP
      document.getElementById('closeModalPedidos').click()
    },
    filtrarEmpresa (empresa) {
      if (document.getElementById('checkEmpresa' + empresa.CODEMP).checked) {
        this.empresasFiltro.push(empresa.CODEMP)  
      } else {
        const index = this.empresasFiltro.indexOf(empresa.CODEMP);
        this.empresasFiltro.splice(index, 1);
      }
      this.filtrarPedidos()
    },
    buscarItens () {
      this.itens = null
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaItens').disabled = true
      axios.get(this.api_url + '/itensPedido?emp=' + this.empPed + '&fil=1&ped=' + this.numPed + '&token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.itens = response.data.itens
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaItens').disabled = false
        })
    },
    selectItem (item) {
      this.seqIpd = item.SEQIPD
      this.desSeqIpd = item.SEQIPD + ' - ' + item.DSCPRO
      this.maxSeqIte = item.QTDPED
      document.getElementById('closeModalItens').click()

      // TODO: ao selecionar um pedido manualmente:
      // se a nota estiver em branco, buscar qual a nota de entrada
      // se estiver preenchida, buscar a nota e se for diferente, avisar e perguntar se usuario quer trocar
    },
    onUploadArquivo () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const file = event.target.files[0]
      this.formData = new FormData()
      this.formData.append('file', file)
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
      axios.post(this.api_url + '/uploadArquivoAss?ped=' + this.numPed + '&ipd=' + this.seqIpd + '&token=' + this.token, this.formData, { headers: headers })
        .then((response) => {
          if (response.data === 'OK') {
            alert('Arquivo enviado com sucesso!')
          } else {
            alert(response.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
        })
    },
    download () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      axios({
        url: this.api_url + '/downloadArquivoAss?ped=' + this.numPed + '&ipd=' + this.seqIpd + '&token=' + this.token, 
        method: 'GET',
        responseType: 'blob'
      })
        .then((response) => {
          if (response.status === 204) {
            alert('Nenhum arquivo disponível para download.')
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'ASS-' + this.numPed + '-' + this.seqIpd + '.zip')
            document.body.appendChild(link)
            link.click()
          }
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
        })
    },
    buscarOrigens () {
      this.origensFiltro = ''
      if (this.origens === null) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnBuscaOrigens').disabled = true
        axios.get(this.api_url + '/origensRnc?token=' + this.token)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            this.origens = response.data.origens
            this.origensFiltradas = response.data.origens
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnBuscaOrigens').disabled = false
          })
      }
    },
    filtrarOrigens () {
      this.origensFiltradas = this.origens.filter(ori => ori.DESRGQ.toUpperCase().startsWith(this.origensFiltro.toUpperCase()))
    },
    selectOrigem (origemClicked) {
      this.numOri = origemClicked.CODRGQ
      this.desOriAss = origemClicked.DESRGQ
      document.getElementById('closeModalOrigens').click()
    },
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }
  .assistenciaTecnica {
    height: 100%;
  }
  .input-group-btn {
    width: 40px !important;
  }
  .btn-inserir {
    width: 2rem !important;
  }
  .mouseHover {
    cursor: pointer;
  }
  .modal:nth-of-type(even) {
    z-index: 1062 !important;
  }
  .modal-backdrop.show:nth-of-type(even) {
    z-index: 1061 !important;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  .sm-header {
    font-size: 0.9rem !important;
  }
  .btn-action {
    width: 2rem;
    margin-left: 1px;
    margin-right: 1px;
  }
  .btn-dismiss {
    color: #fff;
    background-color: #aab4bd;
    border-color: #828385;
  }
  .btn-dismiss:hover {
    color: #fff;
    background-color: #93999e;
    border-color: #8a8a8a;
    border-color: #828385;
  }

    /* For desktop: */
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    [class*="col-"] {
      width: 100%;
    }
  }
</style>
