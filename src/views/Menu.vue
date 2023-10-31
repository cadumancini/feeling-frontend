<template>
  <div class="menu-tela">
    <Navbar title="Portal Web"/>
    <div class="menu">
      <form class="form-menu" @submit.prevent="handleSubmit">
        <div class="menu-context row mb-2 px-2 pt-2" v-if="hasAccess('ALM-')">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerAlmoxarifado">Almoxarifado<span class="arrow" v-text="this.expandAlmoxarifado ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandAlmoxarifado">
            <button class="btn btn-sub mb-1" v-if="hasAccess('ALM-INV')" @click="access('Contagem')">Inventário</button>
            <button class="btn btn-sub mb-1" v-if="hasAccess('ALM-SEP')" @click="access('Separacao')">Separação de Materiais</button>
          </div>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2" v-if="hasAccess('COM-')">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerComercial">Comercial<span class="arrow" v-text="this.expandComercial ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandComercial">
            <button class="btn btn-sub mb-1" v-if="hasAccess('COM-PED')" @click="access('GerarPedido')">Pedido Web</button>
            <button class="btn btn-sub mb-1" v-if="hasAccess('COM-AST')" @click="access('AssistenciaTecnica')">Assistência Técnica</button>
          </div>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2" v-if="hasAccess('PRD-')">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerProducao">Produção<span class="arrow" v-text="this.expandProducao ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandProducao">
            <button class="btn btn-sub mb-1" v-if="hasAccess('PRD-APT')" @click="access('Apontamento')">Apontamento de Produção</button>
            <button class="btn btn-sub mb-1" v-if="hasAccess('PRD-NCN')" @click="access('NaoConformidade')">Registro de Não Conformidade</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Menu',
  components: { Navbar },
  data () {
    return {
      expandAlmoxarifado: false,
      expandComercial: false,
      expandProducao: false,
      formsAvailable: [],
      formsExpanded: []
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')

    this.formsAvailable = []
    axios.get(this.api_url + '/telasDisponiveis?token=' + this.token)
      .then((response) => {
        this.formsAvailable = response.data.telas
      })
      .catch((err) => {
        console.log(err)
      })
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }
    if (localStorage.getItem('formsExpanded')) {
      this.formsExpanded = localStorage.getItem('formsExpanded').split(',')
      this.expandFormsFromStorage()
    }
  },
  methods: {
    handleSubmit () {
    
    },
    triggerAlmoxarifado () {
      this.expandAlmoxarifado = !this.expandAlmoxarifado
      this.handleExpanded('ALMOX')
    },
    triggerComercial () {
      this.expandComercial = !this.expandComercial
      this.handleExpanded('COM')
    },
    triggerProducao () {
      this.expandProducao = !this.expandProducao
      this.handleExpanded('PROD')
    },
    handleExpanded (form) {
      console.log(this.formsExpanded)
      if (this.formsExpanded.includes(form)) {
        var index = this.formsExpanded.indexOf(form);
        if (index !== -1) {
          this.formsExpanded.splice(index, 1);
        }
      } 
      else this.formsExpanded.push(form)

      localStorage.setItem('formsExpanded', this.formsExpanded)
    },
    expandFormsFromStorage () {
      this.expandAlmoxarifado = this.formsExpanded.includes('ALMOX')
      this.expandComercial = this.formsExpanded.includes('COM')
      this.expandProducao = this.formsExpanded.includes('PROD')
    },
    access (form) {
      this.$router.push({ name: form })
    },
    hasAccess (formCode) {
      if (this.formsAvailable.some(form => form.startsWith(formCode))) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
   html, body {
    height: 100%;
  }
  .menu-tela {
    height: 100%;
  }
  .menu {
    padding-top: 40px;
    padding-bottom: 40px;
    height: 80%;
  }
  .menu-context {
    width: 100%;
  }
  .form-menu {
    max-width: 380px;
    margin: 0 auto;
  }
  .submenu {
    margin-left: 48px;
  }

  @media (max-width: 400px) {
    .form-menu {
      max-width: 260px;
    }
    .submenu {
      margin-left: 24px;
    }
  }
  
  .btn-sub {
    display: block;
    color: #fff;
    background-color: #93999e;
    width: 100%;
  }
  .btn-sub:hover {
    color: #fff;
    background-color: #808283;
  }
  .btn-sub:active {
    background-color: #bdbdbd !important;
    color: #fff !important;
  }
  .arrow {
    float: right;
  }

</style>