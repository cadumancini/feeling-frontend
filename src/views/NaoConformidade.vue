<template>
  <div class="naoConformidade">
    <Navbar title="Registro de Não Conformidade"/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número da RNC</span>
                <input class="form-control" type="text" v-on:keydown.tab="onSelect" v-model="numRnc" ref="inputNumRnc" placeholder="Informe o número para carregar NC existente ou 0 (zero) para nova NC">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col-7">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Assunto</span>
                <textarea class="form-control custom-control" v-model="assRnc" ref="inputAssRnc" rows="3" maxlength="250" style="resize:none"></textarea>
              </div>
            </div>
            <div class="col-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Origem</span>
                <input id="oriRnc" class="form-control" type="text" disabled v-model="desOriRnc">
                <button id="btnBuscaOrigens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarOrigens" data-bs-toggle="modal" data-bs-target="#origensModal">...</button>
              </div>
              <div class="input-group input-group-sm mt-2">
                <span class="input-group-text">Área</span>
                <input id="areRnc" class="form-control" type="text" disabled v-model="desAreRnc">
                <button id="btnBuscaAreas" class="btn btn-secondary input-group-btn btn-busca" @click="buscarAreas" data-bs-toggle="modal" data-bs-target="#areasModal">...</button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Requisito ISO</span>
                <input id="reqIso" class="form-control" type="text" disabled v-model="desReqIso">
                <button id="btnBuscaRequisitos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarRequisitos" data-bs-toggle="modal" data-bs-target="#requisitosModal">...</button>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Data de Auditoria</span>
                <input id="datRnc" class="form-control" type="text" disabled :value="datRnc ? datRnc.toLocaleDateString('pt-BR') : ''">
                <button class="btn btn-secondary input-group-btn btn-busca" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Pedido</span>
                <input class="form-control" type="number" v-model="numPed">
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Item</span>
                <input class="form-control" type="number" v-model="seqIpd">
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Sequência</span>
                <input class="form-control" type="number" v-model="seqIte">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-7">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Descrição</span>
                <textarea class="form-control custom-control" v-model="desRnc" ref="inputDesRnc" rows="3" maxlength="1999" style="resize:none"></textarea>
              </div>
            </div>
            <div class="col-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Documento</span>
                <input id="docRnc" class="form-control" type="text" disabled v-model="desDocRnc">
                <button id="btnBuscaDoctos" class="btn btn-secondary input-group-btn btn-busca" @click="buscarDoctos" data-bs-toggle="modal" data-bs-target="#doctosModal">...</button>
              </div>
              <div class="input-group input-group-sm mt-2">
                <span class="input-group-text">Conformidade Procedente</span>
                <select class="form-select" v-model="conPro">
                  <option selected value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-7">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Justificativa</span>
                <textarea class="form-control custom-control" v-model="jusRnc" ref="inputJusRnc" maxlength="1999" rows="3" style="resize:none"></textarea>
              </div>
            </div>
            <div class="col-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Anexos</span>
                <label class="btn btn-sm btn-action btn-dismiss btn-secondary sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Upload de anexo(s)">
                  <font-awesome-icon icon="file-upload"/><input type="file" ref="uploadArquivo" style="display: none;" @change="onUploadArquivo"/>
                </label>
                <button class="btn btn-sm btn-action btn-dismiss btn-secondary sm" @click="download" data-bs-toggle="tooltip" data-bs-placement="top" title="Download de anexo(s)">
                  <font-awesome-icon icon="download"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="d-grid gap-2">
          <button id="btnProcessar" class="btn btn-secondary" type="button" @click="enviarRnc" ref="btnProcessar">Processar</button>
        </div>
      </div>

      <!-- Modal Origens -->
      <div class="modal fade" id="origensModal" tabindex="-1" aria-labelledby="origensModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="origensModalLabel">Busca de Origens para RNC</h5>
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
              <h5 class="modal-title" id="areasModalLabel">Busca de Áreas para RNC</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAreas"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="areas != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarAreas" v-model="areasFiltro" placeholder="Digite para buscar a área na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Área</th>
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

      <!-- Modal Doctos -->
      <div class="modal fade" id="doctosModal" tabindex="-1" aria-labelledby="doctosModalLabel" aria-hidden="true">
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
      </div>

      <!-- Modal Requisitos -->
      <div class="modal fade" id="requisitosModal" tabindex="-1" aria-labelledby="requisitosModalLabel" aria-hidden="true">
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
      </div>

      <!-- Modal DatePicker -->
      <div class="modal fade" id="datePickerModal" tabindex="-1" aria-labelledby="datePickerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="datePickerModalLabel">Data de Auditoria</h5>
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

      <div class="row mt-5 mb-1">
        <div class="border border-2 rounded-3 px-2 py-2">
          <div class="row">
            <div class="d-grid gap-2">
              <button class="btn btn-secondary" type="button" @click="cancelar">Cancelar</button>
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
      numRnc: '',
      assRnc: '',
      oriRnc: '',
      desOriRnc: '',
      origensFiltro: '',
      origensFiltradas: null,
      origens: null,
      areRnc: '',
      desAreRnc: '',
      areasFiltro: '',
      areasFiltradas: null,
      areas: null,
      reqIso: '',
      desReqIso: '',
      requisitosFiltro: '',
      requisitosFiltrados: null,
      requisitos: null,
      areas: null,
      docRnc: '',
      desDocRnc: '',
      doctosFiltro: '',
      doctosFiltrados: null,
      doctos: null,
      datRnc: new Date(),
      conPro: '',
      jusRnc: '',
      desRnc: '',
      numPed: '',
      seqIpd: '',
      seqIte: '',
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
    onSelect () {
      alert('Pressionou tab')
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
      // axios.get(this.api_url + '/downloadArquivoRnc?ped=' + this.numPed + '&ipd=' + this.seqIpd + '&token=' + this.token)
      axios({
        url: this.api_url + '/downloadArquivoRnc?ped=' + this.numPed + '&ipd=' + item.seqIpd + '&token=' + this.token, 
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
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const body = JSON.stringify({
        rnc: {
          codEmp: 1,
          tipRmc: 'RNC',
          numRmc: this.numRnc,
          assRmc: this.assRnc,
          oriRmc: this.oriRnc,
          reqIso: this.reqIso,
          areApl: this.areRnc,
          datAud: this.datRnc.toLocaleDateString('pt-BR'),
          desNcf: this.desRnc,
          codDoc: this.docRnc,
          conPro: this.conPro,
          jusCon: this.jusRnc,
          numPed: this.numPed > 0 ? this.numPed : 0,
          seqIpd: this.seqIpd > 0 ? this.seqIpd : 0,
          seqIte: this.seqIte > 0 ? this.seqIte : 0
        }
      })
      const headers = { headers: { 'Content-Type': 'application/json' } }
      axios.put(this.api_url + '/rnc?token=' + this.token, body, headers)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          if (response.data === 'OK') {
            alert('RNC inserida com sucesso!')
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
    cancelar () {
      this.codBarrasCab = ''
      this.$refs.inputCodBarras.focus()
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
  .btn-busca {
    width: 1.75rem !important;
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
</style>
