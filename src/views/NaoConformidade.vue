<template>
  <div class="naoConformidade">
    <Navbar title="Não Conformidade"/>
    <div class="mx-3 mt-1">
      <div class="row">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número da RNC:</span>
                <input class="form-control" type="text" v-on:keydown.tab="onSelect" v-model="numRnc" ref="inputNumRnc" placeholder="Informe o número para carregar NC existente ou 0 (zero) para nova NC">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="border border-2 rounded-3 px-2 pt-2">
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Assunto:</span>
                <textarea class="form-control custom-control" v-model="assRnc" ref="inputAssRnc" rows="3" style="resize:none"></textarea>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Origem:</span>
                <input id="oriRnc" class="form-control" type="text" disabled v-model="desOriRnc">
                <button id="btnBuscaOrigens" class="btn btn-secondary input-group-btn btn-busca" @click="buscarOrigens" data-bs-toggle="modal" data-bs-target="#origensModal">...</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Transportadoras -->
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

export default {
  name: 'NaoConformidade',
  components: { Navbar },
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
      origens: null
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
    // processar () {
    //   document.getElementsByTagName('body')[0].style.cursor = 'wait'
    //   document.getElementById('btnProcessar').disabled = true

    //   axios.post(this.api_url + '/apontarOP?token=' + this.token + '&codBar=' + this.codBarrasCab)
    //     .then(response => {
    //       this.checkInvalidLoginResponse(response.data)
    //       alert(response.data)
    //       this.cancelar()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //     .finally(() => {
    //       document.getElementsByTagName('body')[0].style.cursor = 'auto'
    //       document.getElementById('btnProcessar').disabled = false
    //     })

    // },
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
</style>
