<template>
  <div class="apontamento">
    <Navbar title="Apontamento de OPs"/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cód. de Barras</span>
                <input class="form-control" type="text" v-on:keyup="onKeyUp" v-on:keyup.enter="onEnter" v-model="codBarrasCab" ref="inputCodBarras">
              </div>
            </div>
          </div>
          <div class="row mb-2" v-if="this.ordemProducao">
            <div class="col">
              <p class="sm fw-bold fst-italic mb-1">Processo: {{ this.ordemProducao.DESFAM }}</p>
              <p class="sm fw-bold fst-italic mb-1">Pedido: {{this.ordemProducao.NUMPED}}</p>
              <p class="sm fw-bold fst-italic mb-1">Item: {{this.ordemProducao.SEQIPD}}</p>
              <p class="sm fw-bold fst-italic mb-1">Sequência: {{this.ordemProducao.SEQIPE}}</p>
              <p class="sm fw-bold fst-italic mb-1">Produto: {{this.ordemProducao.DESPRO}}</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Apontamento</span>
                <select class="form-select" v-model="aptIntExt">
                  <option selected value="N">Normal (não vai para terceiro)</option>
                  <option value="E">Externo</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-2" v-if="aptIntExt === 'E' && this.ordemProducao">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Operação</span>
                <select class="form-select" v-model="aptRemRet">
                  <option selected value="E">Envio para terceiro</option>
                  <option value="R">Retorno de terceiro</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Fornecedor</span>
                <input id="numPed" class="form-control" type="text" disabled v-model="nomFor">
                <button id="btnBuscaFornecedores" class="btn btn-secondary input-group-btn btn-busca" @click="buscaFornecedores" data-bs-toggle="modal" data-bs-target="#fornecedoresModal">...</button>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-grid gap-2">
              <button id="btnProcessar" class="btn btn-secondary" type="button" @click="processar" ref="btnProcessar">Processar</button>
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

      <!-- Modal Fornecedores -->
      <div class="modal fade" id="fornecedoresModal" tabindex="-1" aria-labelledby="fornecedoresModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="fornecedoresModalLabel">Busca de Fornecedores</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalFornecedores" @click="onEnter"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3" v-if="fornecedores != null">
                <input type="text" class="form-control mb-3" v-on:keyup="filtrarFornecedores" id="inputFiltroFornecedor" v-model="fornecedoresFiltro" placeholder="Digite para buscar o fornecedor na tabela abaixo">
                <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                  <thead>
                    <tr>
                      <th class="sm-header" scope="col">Código</th>
                      <th class="sm-header" scope="col">Nome</th>
                      <th class="sm-header" scope="col">Apelido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in fornecedoresFiltrados" :key="row.CODFOR" class="mouseHover" @click="selectFornecedor(row)">
                      <th class="fw-normal sm" scope="row">{{ row.CODFOR }}</th>
                      <th class="fw-normal sm">{{ row.NOMFOR }}</th>
                      <th class="fw-normal sm">{{ row.APEFOR }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <label>Buscando fornecedores ...</label>
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

export default {
  name: 'Apontamento',
  components: { Navbar },
  data () {
    return {
      api_url: '',
      token: '',
      codBarrasCab: '',
      aptIntExt: 'N',
      aptRemRet: 'E',
      ordemProducao: null,
      codFor: '',
      nomFor: '',
      fornecedores: null,
      fornecedoresFiltrados: null,
      fornecedoresFiltro: ''
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
      this.$refs.inputCodBarras.focus()
    }
  },
  methods: {
    checkAccess() {
      axios.get(this.api_url + '/telasDisponiveis?token=' + this.token + '&tela=PRD-APT')
      .then((response) => {
        if (response.data === 'Tela não encontrada' || response.data.telas[0] !== 'PRD-APT') {
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
    onKeyUp (e) {
      if (this.codBarrasCab.length === 24 && e.keyCode !== 13) {
        this.ordemProducao = null
        const partes = this.codBarrasCab.split('.')
        axios.get(this.api_url + '/opsAcabado?token=' + this.token + '&codEmp=' + partes[0] + '&numPed=' + partes[2] + '&seqIpd=' + partes[3] + '&codFam=' + partes[1])
        .then((response) => {
          console.log(response.data)
          if (response.data.ops.length) {
            this.ordemProducao = response.data.ops[0]
            this.ordemProducao.SEQIPE = Number(partes[4])
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    onEnter () {
      this.$refs.btnProcessar.focus()
    },
    buscaFornecedores () { 
      this.fornecedoresFiltro = ''
      this.fornecedores = null
      this.fornecedoresFiltrados = null
      const partes = this.codBarrasCab.split('.')
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnBuscaFornecedores').disabled = true
      axios.get(this.api_url + '/fornecedoresPorProduto?token=' + this.token)
        .then((response) => {
          this.checkInvalidLoginResponse(response.data)
          this.fornecedores = response.data.fornecedores
          this.fornecedoresFiltrados = response.data.fornecedores
          document.getElementById('inputFiltroFornecedor').focus()   
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnBuscaFornecedores').disabled = false          
        })
    },
    filtrarFornecedores () {
      this.fornecedoresFiltrados = this.fornecedores.filter(forn => forn.NOMFOR.toUpperCase().startsWith(this.fornecedoresFiltro.toUpperCase()) || 
                    forn.APEFOR.toUpperCase().startsWith(this.fornecedoresFiltro.toUpperCase()) || 
                    forn.CODFOR.toUpperCase().startsWith(this.fornecedoresFiltro.toUpperCase()))
    },
    selectFornecedor (row) {
      this.codFor = row.CODFOR
      this.nomFor = row.CODFOR + ' - ' + row.NOMFOR
      document.getElementById('closeModalFornecedores').click()
      document.getElementById('btnProcessar').focus()
    },
    processar () {
      if (this.validarCampos()) {
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        document.getElementById('btnProcessar').disabled = true

        const tipOpe = this.aptIntExt === 'N' ? this.aptIntExt : this.aptRemRet
        const codFor = this.aptIntExt === 'N' ? '' : this.codFor

        axios.post(this.api_url + '/apontarOP?token=' + this.token + '&codBar=' + this.codBarrasCab + '&tipOpe=' + 
                    tipOpe + '&codFor=' + codFor)
          .then(response => {
            this.checkInvalidLoginResponse(response.data)
            alert(response.data)
            this.cancelar()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('btnProcessar').disabled = false
          })
      }
    },
    validarCampos () {
      if (this.aptIntExt === 'E') {
        if (this.codFor === '') {
          alert('Por favor, informe um fornecedor!')
          return false
        }
      }
      return true
    },
    cancelar () {
      this.codBarrasCab = ''
      this.aptIntExt = 'N'
      this.aptRemRet = 'E'
      this.codFor = ''
      this.nomFor = ''
      this.ordemProducao = null
      this.$refs.inputCodBarras.focus()
    }
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }
  .apontamento {
    height: 100%;
  }
  .btn-busca {
    width: 1.75rem !important;
  }
  .mouseHover {
    cursor: pointer;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  .sm-header {
    font-size: 0.9rem !important;
  }
</style>
