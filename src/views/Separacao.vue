<template>
  <div class="separacao">
    <Navbar title="Separação de Materiais"/>
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
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Quantidade</span>
                <input class="form-control" disabled v-model="qtdeReq">
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-grid gap-2">
              <button id="btnProcessar" :disabled="qtdeReq === ''" class="btn btn-secondary" type="button" @click="processar">Processar</button>
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
  name: 'Separacao',
  components: { Navbar },
  data () {
    return {
      api_url: '',
      token: '',
      codBarrasCab: '',
      qtdeReq: ''
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
      axios.get(this.api_url + '/telasDisponiveis?token=' + this.token + '&tela=ALM-SEP')
      .then((response) => {
        if (response.data === 'Tela não encontrada' || response.data.telas[0] !== 'ALM-SEP') {
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
      this.processar()
    },
    processar () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'

      const operacao = this.qtdeReq === '' ? 'C' : 'A'
      console.log(operacao)
      axios.post(this.api_url + '/separarAlmox?token=' + this.token + '&codBar=' + this.codBarrasCab + '&operacao=' + operacao)
        .then(response => {
          this.checkInvalidLoginResponse(response.data)
          if (operacao === 'A') {
            alert(response.data)
            this.cancelar()
          } else {
            if (response.data.OP[0]) {
              this.qtdeReq = response.data.OP[0].QTDREQ
              document.getElementById('btnProcessar').focus()
            }
            else {
              alert('Nenhum dado encontrado para a OP lida!')  
              this.cancelar()
            } 
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
      this.qtdeReq = ''
      this.$refs.inputCodBarras.focus()
    }
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
  }
  .separacao {
    height: 100%;
  }
</style>
