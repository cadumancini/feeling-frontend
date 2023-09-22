<template>
  <div class="naoConformidade">
    <Navbar title="Registro de Não Conformidade"/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row">
            <div class="col mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número da RNC</span>
                <input class="form-control" type="text" v-model="numRnc" ref="inputNumRnc" disabled>
                <button id="btnBuscaRncs" class="btn btn-secondary input-group-btn btn-busca" @click="buscarRncs" data-bs-toggle="modal" data-bs-target="#rncsModal">...</button>
                <button id="btnIniciarRncs" class="btn btn-secondary input-group-btn btn-busca" @click="iniciarRnc">+</button>
              </div>
            </div>
            <div class="col-auto mb-2">
              <button class="float-end btn-sm btn btn-secondary btn-sm ms-2" type="button" @click="cancelar" :disabled="numRnc === ''">Cancelar</button>
              <button id="btnProcessar" class="float-end btn btn-secondary btn-sm" type="button" @click="enviarRnc" ref="btnProcessar" :disabled="numRnc === ''">Processar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row">
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Data de Abertura</span>
                <input id="datRnc" class="form-control" type="text" disabled :value="datRnc ? datRnc.toLocaleDateString('pt-BR') : ''">
                <button class="btn btn-secondary input-group-btn btn-busca" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
              </div>
            </div>
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Usuário</span>
                <input class="form-control" type="text" disabled v-model="usuRnc">
              </div>
            </div>
            <!-- <div class="col-7">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Assunto</span>
                <textarea class="form-control custom-control" v-model="assRnc" ref="inputAssRnc" rows="3" maxlength="250" style="resize:none" :disabled="numRnc === ''"></textarea>
              </div>
            </div> -->
          </div>
          <div class="row">
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Área de Origem</span>
                <input id="oriRnc" class="form-control" type="text" disabled v-model="desOriRnc">
                <button id="btnBuscaOrigens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarOrigens" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#origensModal">...</button>
              </div>
            </div>
            <div class="col-6 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Classificação</span>
                <input id="areRnc" class="form-control" type="text" disabled v-model="desAreRnc">
                <button id="btnBuscaAreas" class="btn btn-secondary input-group-btn btn-busca" @click="buscarAreas" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#areasModal">...</button>
              </div>
            </div>
          </div>
            <!-- <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Requisito ISO</span>
                <input id="reqIso" class="form-control" type="text" disabled v-model="desReqIso">
                <button id="btnBuscaRequisitos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarRequisitos" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#requisitosModal">...</button>
              </div>
            </div> -->
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Pedido</span>
                <input class="form-control" type="number" v-model="numPed" disabled>
                <button id="btnBuscaPedidos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarPedidos" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#pedidosModal">...</button>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Item</span>
                <input class="form-control sm" v-model="desSeqIpd" disabled>
                <button id="btnBuscaItens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarItens" :disabled="numRnc === '' || numPed === ''" data-bs-toggle="modal" data-bs-target="#itensModal">...</button>
              </div>
            </div>
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Sequência</span>
                <input class="form-control" type="number" v-model="seqIte" ref="inputSeqIte" :disabled="numRnc === '' || numPed === '' || seqIpd === ''">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Detalhamento do Ocorrido</span>
              <textarea class="form-control custom-control" v-model="desRnc" ref="inputDesRnc" rows="2" maxlength="1999" style="resize:none" :disabled="numRnc === ''"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-5 mb-2">
              <!-- <div class="input-group input-group-sm">
                <span class="input-group-text">Documento</span>
                <input id="docRnc" class="form-control" type="text" disabled v-model="desDocRnc">
                <button id="btnBuscaDoctos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarDoctos" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#doctosModal">...</button>
              </div> -->
              <div class="input-group input-group-sm">
                <span class="input-group-text">Procedência</span>
                <select class="form-select" v-model="conPro" :disabled="numRnc === ''">
                  <option selected value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </div>
            </div>
            <div class="col mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Anexos</span>
                <label class="btn btn-sm btn-action btn-secondary sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Upload de anexo(s)" v-bind:class="{ disabled: !rncCarregada }">
                  <font-awesome-icon icon="file-upload"/><input type="file" ref="uploadArquivo" style="display: none;" @change="onUploadArquivo"/>
                </label>
                <button class="btn btn-sm btn-action btn-secondary sm" @click="download" data-bs-toggle="tooltip" data-bs-placement="top" title="Download de anexo(s)" :disabled="!rncCarregada">
                  <font-awesome-icon icon="download"/>
                </button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Conclusão</span>
              <textarea class="form-control custom-control" v-model="jusRnc" ref="inputJusRnc" maxlength="1999" rows="2" style="resize:none" :disabled="numRnc === ''"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Ação</span>
                <input class="form-control" type="text" disabled v-model="desTipAca">
                <button id="btnBuscaTiposAcao" class="btn btn-secondary input-group-btn btn-busca" @click="buscarTiposAcao" :disabled="numRnc === ''" data-bs-toggle="modal" data-bs-target="#tiposAcaoModal">...</button>
              </div>
            </div>
            <div class="col mb-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Descrição da Ação</span>
                <textarea class="form-control custom-control" v-model="acaRnc" ref="inputAcaRnc" maxlength="1999" rows="2" style="resize:none" :disabled="numRnc === ''"></textarea>
              </div>
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

      <!-- Modal Areas -->
      <div class="modal fade" id="areasModal" tabindex="-1" aria-labelledby="areasModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="areasModalLabel">Busca de Classificação para RNC</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAreas"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="areas != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarAreas" v-model="areasFiltro" placeholder="Digite para buscar a área na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Classificação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="areaRow in areasFiltradas" :key="areaRow.CODARE" class="mouseHover" @click="selectArea(areaRow)">
                      <th class="fw-normal sm" scope="row">{{ areaRow.CODARE }}</th>
                      <th class="fw-normal sm">{{ areaRow.NOMARE }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando áreas ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Tipos Ação -->
      <div class="modal fade" id="tiposAcaoModal" tabindex="-1" aria-labelledby="tiposAcaoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="tiposAcaoModalLabel">Busca de Ação para RNC</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalTiposAcao"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="tiposAcao != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarTiposAcao" v-model="tiposAcaoFiltro" placeholder="Digite para buscar a ação na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tipoAcaoRow in tiposAcaoFiltrados" :key="tipoAcaoRow.CODACI" class="mouseHover" @click="selectTipoAcao(tipoAcaoRow)">
                      <th class="fw-normal sm" scope="row">{{ tipoAcaoRow.CODACI }}</th>
                      <th class="fw-normal sm">{{ tipoAcaoRow.DESACI }}</th>
                    </tr>
                  </tbody>
                </table>
                <!-- <button class = 'btn btn-secondary btn-sm mb-2' @click="enableInserirTipoAcao">Inserir</button>
                <div class="row mb-2" v-if="inserindoAtipoAcao">
                  <div class="col-3">
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">Código</span>
                      <input class="form-control" v-model="codAcaoInserir" ref="inputCodAcaoInserir">
                    </div>  
                  </div>
                  <div class="col-5">
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">Descrição</span>
                      <input class="form-control" v-model="desAcaoInserir" ref="inputDesAcaoInserir">
                    </div>  
                  </div>
                  <div class="col">
                    <button class = 'btn btn-secondary btn-sm ms-2' @click="inserirTipoAcao">Salvar</button> 
                    <button class = 'btn btn-secondary btn-sm ms-2' @click="cancelarTipoAcao">Cancelar</button> 
                  </div>
                </div> -->
              </div>
              <div v-else>
                <label>Buscando tipos de ação ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Doctos -->
      <!-- <div class="modal fade" id="doctosModal" tabindex="-1" aria-labelledby="doctosModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="areasModalLabel">Busca de Documentos para RNC</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDoctos"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="doctos != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarDoctos" v-model="doctosFiltro" placeholder="Digite para buscar o documento na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Documento</th>
                      <th class="sm-header" scope="col">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="doctoRow in doctosFiltrados" :key="doctoRow.CODDOC" class="mouseHover" @click="selectDocto(doctoRow)">
                      <th class="fw-normal sm" scope="row">{{ doctoRow.CODDOC }}</th>
                      <th class="fw-normal sm">{{ doctoRow.DESDOC }}</th>
                      <th class="fw-normal sm">{{ doctoRow.SITDOC }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando documentos ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div> -->

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

      <!-- Modal Requisitos -->
      <!-- <div class="modal fade" id="requisitosModal" tabindex="-1" aria-labelledby="requisitosModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="requisitosModalLabel">Busca de Requisitos da ISO</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalRequisitos"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="requisitos != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarRequisitos" v-model="requisitosFiltro" placeholder="Digite para buscar o requisitos na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reqRow in requisitosFiltrados" :key="reqRow.REQISO" class="mouseHover" @click="selectRequisito(reqRow)">
                      <th class="fw-normal sm" scope="row">{{ reqRow.REQISO }}</th>
                      <th class="fw-normal sm">{{ reqRow.DESREQ }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando requisitos ...</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div> -->

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
                <DatePicker v-model="datePicked" mode="date" locale="br"/>
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
  name: 'NaoConformidade',
  components: { Navbar, DatePicker },
  computed: {
    datePicked: {
      get() {
        return this.datRnc
      },
      set(v) {
        this.datRnc = v
        document.getElementById('closeModalDatePicker').click()
      }
    }
  },
  data () {
    return {
      api_url: '',
      token: '',
      rncs: null,
      rncsFiltradas: null,
      rncsFiltro: '',
      numRnc: '',
      // assRnc: '',
      oriRnc: '',
      desOriRnc: '',
      origensFiltro: '',
      origensFiltradas: null,
      origens: null,
      pedidosFiltro: '',
      pedidosFiltrados: null,
      pedidos: null,
      empresas: null,
      empresasFiltro: [],
      itens: null,
      areRnc: '',
      desAreRnc: '',
      areasFiltro: '',
      areasFiltradas: null,
      areas: null,
      // reqIso: '',
      // desReqIso: '',
      // requisitosFiltro: '',
      // requisitosFiltrados: null,
      // requisitos: null,
      // docRnc: '',
      // desDocRnc: '',
      // doctosFiltro: '',
      // doctosFiltrados: null,
      // doctos: null,
      datRnc: null,
      conPro: '',
      jusRnc: '',
      desRnc: '',
      numPed: '',
      empPed: '',
      seqIpd: '',
      desSeqIpd: '',
      seqIte: '',
      maxSeqIte: '',
      usuRnc: '',
      acaRnc: '',
      tiposAcao: null,
      tiposAcaoFiltro: '',
      tiposAcaoFiltrados: null,
      tipAca: '',
      desTipAca: '',
      inserindoAtipoAcao: false,
      codAcaoInserir: '',
      desAcaoInserir: '',
      rncCarregada: false
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
      this.$refs.inputNumRnc.focus()
    }
  },
  methods: {
    checkAccess() {
      axios.get(this.api_url + '/telasDisponiveis?token=' + this.token + '&tela=PRD-NCN')
      .then((response) => {
        if (response.data === 'Tela não encontrada' || response.data.telas[0] !== 'PRD-NCN') {
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
    buscarRncs () {
      this.rncsFiltro = ''
      this.rncs = null
      this.rncsFiltradas = null
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaRncs').disabled = true
      axios.get(this.api_url + '/rncs?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.rncs = response.data.rnc
          this.rncsFiltradas = response.data.rnc
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaRncs').disabled = false
        })
    },
    filtrarRncs () {
      this.rncsFiltradas = this.rncs.filter(rnc => rnc.NUMRMC.toUpperCase().startsWith(this.rncsFiltro.toUpperCase()))
    },
    selectRnc (rncClicked) {
      this.numRnc = rncClicked.NUMRMC
      this.assRnc = rncClicked.ASSRMC
      this.oriRnc = rncClicked.ORIRMC
      this.desOriRnc = rncClicked.DESRGQ
      this.areRnc = rncClicked.AREAPL
      this.desAreRnc = rncClicked.NOMARE
      this.reqIso = rncClicked.REQISO
      this.desReqIso = rncClicked.DESREQ
      this.docRnc = rncClicked.CODDOC
      this.desDocRnc = rncClicked.DESDOC
      this.datePicked = new Date(rncClicked.DATAUD.substring(6, 10) + '-' + rncClicked.DATAUD.substring(3, 5) + '-' + rncClicked.DATAUD.substring(0, 2) + 'T00:00:00')
      this.conPro = rncClicked.CONPRO
      this.jusRnc = rncClicked.JUSCON
      this.desRnc = rncClicked.DESNCF
      this.numPed = rncClicked.NUMPED
      this.seqIpd = rncClicked.SEQIPD
      this.seqIte = rncClicked.SEQITE
      this.usuRnc = rncClicked.USERNAME
      this.rncCarregada = true
      document.getElementById('closeModalRncs').click()
      this.buscarAcaoRnc()
    },
    buscarAcaoRnc () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      axios.get(this.api_url + '/acaoRnc?token=' + this.token + '&codEmp=1&tipRmc=RNC&numRmc=' + this.numRnc)
        .then((response) => {
          if (response.data.acaoRnc.length) {
            const acao = response.data.acaoRnc[0]
            this.tipAca = acao.CODACI
            this.desTipAca = acao.DESACI
            this.acaRnc = acao.ACITOM
          }
        })
        .catch((err) => {
          console.log(err)
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
      this.oriRnc = origemClicked.CODRGQ
      this.desOriRnc = origemClicked.DESRGQ
      document.getElementById('closeModalOrigens').click()
    },
    buscarAreas () {
      this.areasFiltro = ''
      if (this.areas === null) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnBuscaAreas').disabled = true
        axios.get(this.api_url + '/areasRnc?token=' + this.token)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            this.areas = response.data.areas
            this.areasFiltradas = response.data.areas
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnBuscaAreas').disabled = false
          })
      }
    },
    filtrarAreas () {
      this.areasFiltradas = this.areas.filter(area => area.NOMARE.toUpperCase().startsWith(this.areasFiltro.toUpperCase()))
    },
    selectArea (areaClicked) {
      this.areRnc = areaClicked.CODARE
      this.desAreRnc = areaClicked.NOMARE
      document.getElementById('closeModalAreas').click()
    },
    buscarTiposAcao () {
      this.tiposAcaoFiltroFiltro = ''
      this.inserindoAtipoAcao = false
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaTiposAcao').disabled = true
      axios.get(this.api_url + '/tiposAcaoRnc?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.tiposAcao = response.data.tiposAcao
          this.tiposAcaoFiltrados = response.data.tiposAcao
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaTiposAcao').disabled = false
        })
    },
    filtrarTiposAcao () {
      this.tiposAcaoFiltrados = this.tiposAcao.filter(tipo => tipo.CODACI.toUpperCase().startsWith(this.tiposAcaoFiltro.toUpperCase()))
    },
    selectTipoAcao (tipo) {
      this.tipAca = tipo.CODACI
      this.desTipAca = tipo.DESACI
      document.getElementById('closeModalTiposAcao').click()
    },
    buscarRequisitos () {
      this.requisitosFiltro = ''
      if (this.requisitos === null) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnBuscaRequisitos').disabled = true
        axios.get(this.api_url + '/requisitosIso?token=' + this.token)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            this.requisitos = response.data.requisitos
            this.requisitosFiltrados = response.data.requisitos
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnBuscaRequisitos').disabled = false
          })
      }
    },
    filtrarRequisitos () {
      this.requisitosFiltrados = this.requisitos.filter(req => req.DESREQ.toUpperCase().startsWith(this.requisitosFiltro.toUpperCase()))
    },
    selectRequisito (requisitoClicked) {
      this.reqIso = requisitoClicked.REQISO
      this.desReqIso = requisitoClicked.REQISO + ' - ' + requisitoClicked.DESREQ
      document.getElementById('closeModalRequisitos').click()
    },
    buscarDoctos () {
      this.doctosFiltro = ''
      if (this.doctos === null) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnBuscaDoctos').disabled = true
        axios.get(this.api_url + '/doctosRnc?token=' + this.token)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            this.doctos = response.data.doctos
            this.doctosFiltrados = response.data.doctos
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnBuscaDoctos').disabled = false
          })
      }
    },
    filtrarDoctos () {
      this.doctosFiltrados = this.doctos.filter(docto => docto.DESDOC.toUpperCase().startsWith(this.doctosFiltro.toUpperCase()))
    },
    selectDocto (doctoClicked) {
      this.docRnc = doctoClicked.CODDOC
      this.desDocRnc = doctoClicked.DESDOC
      document.getElementById('closeModalDoctos').click()
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
      axios.post(this.api_url + '/uploadArquivoRnc?ped=' + this.numPed + '&ipd=' + this.seqIpd + '&token=' + this.token, this.formData, { headers: headers })
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
        url: this.api_url + '/downloadArquivoRnc?ped=' + this.numPed + '&ipd=' + this.seqIpd + '&token=' + this.token, 
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
            link.setAttribute('download', 'NC-' + this.numPed + '-' + this.seqIpd + '.zip')
            document.body.appendChild(link)
            link.click()
          }
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
        })
    },
    enviarRnc () {
      if (this.validarRnc()) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        const body = JSON.stringify({
          rnc: {
            codEmp: 1,
            tipRmc: 'RNC',
            numRmc: this.numRnc,
            oriRmc: this.oriRnc,
            areApl: this.areRnc,
            datAud: this.datRnc.toLocaleDateString('pt-BR'),
            desNcf: this.desRnc,
            conPro: this.conPro,
            jusCon: this.jusRnc,
            numPed: this.numPed > 0 ? this.numPed : 0,
            seqIpd: this.seqIpd > 0 ? this.seqIpd : 0,
            seqIte: this.seqIte > 0 ? this.seqIte : 0,
            tipAca: this.tipAca,
            acaRnc: this.acaRnc
          }
        })
        const headers = { headers: { 'Content-Type': 'application/json' } }
        axios.put(this.api_url + '/rnc?token=' + this.token, body, headers)
          .then((response) => {
            this.checkInvalidLoginResponse(response.data)
            if (response.data === 'OK') {
              this.rncCarregada = true
              alert('RNC inserida/atualizada com sucesso! Anexos podem ser enviados.')
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
      }
    },
    validarRnc () {
      return this.validarOrigem() && this.validarArea() && this.validarCamposPedido() && 
        this.validarDescricao() && this.validarProcedente() && this.validarConclusao()
    },
    validarOrigem () {
      if (this.oriRnc === '') {
        alert('Favor informar uma área de origem!')
        return false
      }
      return true
    },
    validarArea () {
      if (this.areRnc === '') {
        alert('Favor informar uma classificação!')
        return false
      }
      return true
    },
    validarCamposPedido () {
      if (this.numPed === '' || this.seqIpd === '' || this.seqIte === '') {
        alert('Favor informar pedido, item e sequência!')
        return false
      }
      return this.checkSeqIte()
    },
    checkSeqIte () {
      if (this.seqIte <= 0 || this.seqIte > this.maxSeqIte) {
        alert('Atenção: A sequência do item deve ser entre 1 e ' + this.maxSeqIte + '!')
        return false
      }
      return true
    },
    validarDescricao () {
      if (this.desRnc === '') {
        alert('Favor informar o detalhamento do ocorrido!')
        return false
      }
      return true
    },
    validarProcedente () {
      if (this.conPro === '') {
        alert('Favor informar um valor para procedência!')
        return false
      }
      return true
    },
    validarConclusao () {
      if (this.jusRnc === '') {
        alert('Favor informar uma conclusão!')
        return false
      }
      return true
    },
    iniciarRnc () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnIniciarRncs').disabled = true
      axios.get(this.api_url + '/proximaRnc?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.iniciarCampos()
          this.numRnc = response.data.rnc[0].NUMRMC
          this.usuRnc = response.data.rnc[0].USERNAME
          this.datePicked = new Date()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnIniciarRncs').disabled = false
        })
    },
    iniciarCampos () {
      this.assRnc = ''
      this.oriRnc = ''
      this.desOriRnc = ''
      this.areRnc = ''
      this.desAreRnc = ''
      this.reqIso = ''
      this.desReqIso = ''
      this.docRnc = ''
      this.desDocRnc = ''
      this.datePicked = null
      this.datRnc = null
      this.conPro = ''
      this.jusRnc = ''
      this.desRnc = ''
      this.numPed = ''
      this.seqIpd = ''
      this.desSeqIpd = ''
      this.seqIte = ''
      this.tipAca = ''
      this.desTipAca = ''
      this.acaRnc = ''
      this.rncCarregada = false
    },
    cancelar () {
      this.numRnc = ''
      this.usuRnc = ''
      this.iniciarCampos()
    },
    enableInserirTipoAcao () {
      this.inserindoAtipoAcao = true
    },
    cancelarTipoAcao () {
      this.inserindoAtipoAcao = false
      this.codAcaoInserir = ''
      this.desAcaoInserir = ''
    },
    inserirTipoAcao () {
      if (this.codAcaoInserir === '' || this.codAcaoInserir === ' ' || this.desAcaoInserir === '' || this.desAcaoInserir === ' ') {
        alert ('Favor preencher os dois campos do tipo de ação!')
      } else {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        axios.put(this.api_url + '/tipoAcaornc?token=' + this.token + '&codAcao=' + this.codAcaoInserir + '&desAcao=' + this.desAcaoInserir)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          if (response.data === 'OK') {
            this.cancelarTipoAcao()
            this.buscarTiposAcao()
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
      }
    }
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }
  .naoConformidade {
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
