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
                <input class="form-control" type="text" v-on:keyup.enter="onEnter" v-model="codBarrasCab" ref="inputCodBarras">
              </div>
            </div>
          </div>
          <div class="row mb-2" v-if="this.ordemProducao">
            <div class="col">
              <p class="sm fw-bold fst-italic">Order de produção referente ao:</p>
              <p class="sm fw-bold fst-italic">Pedido: {{this.ordemProducao.NUMPED}} - Item: {{this.ordemProducao.SEQIPD}}</p>
              <p class="sm fw-bold fst-italic">Produto: {{this.ordemProducao.DESPRO}}</p>
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
      ordemProducao: null
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
    onEnter () {
      this.ordemProducao = null
      const partes = this.codBarrasCab.split('.')
      axios.get(this.api_url + '/opsAcabado?token=' + this.token + '&codEmp=' + partes[0] + '&numPed=' + partes[2] + '&seqIpd=' + partes[3])
      .then((response) => {
        console.log(response.data)
        if (response.data.ops.length) {
          this.ordemProducao = response.data.ops[0]
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => this.$refs.btnProcessar.focus())
    },
    processar () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnProcessar').disabled = true

      axios.post(this.api_url + '/apontarOP?token=' + this.token + '&codBar=' + this.codBarrasCab)
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

    },
    cancelar () {
      this.codBarrasCab = ''
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
</style>
