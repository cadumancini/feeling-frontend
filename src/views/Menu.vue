<template>
  <div class="menu-tela">
    <Navbar title="Portal Web"/>
    <div class="menu">
      <form class="form-menu" @submit.prevent="handleSubmit">
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerAlmoxarifado">Almoxarifado<span class="arrow" v-text="this.expandAlmoxarifado ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandAlmoxarifado">
            <button class="btn btn-sub mb-1" @click="access('Contagem')">Inventário</button>
            <button class="btn btn-sub mb-1">Separação de Materiais</button>
          </div>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerComercial">Comercial<span class="arrow" v-text="this.expandComercial ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandComercial">
            <button class="btn btn-sub mb-1" @click="access('GerarPedido')">Pedido Web</button>
            <button class="btn btn-sub mb-1">Assistência Técnica</button>
          </div>
        </div>
        <div class="menu-context row mb-2 px-2 pt-2">
          <button class="btn btn-lg btn-secondary mb-1" @click="triggerProducao">Produção<span class="arrow" v-text="this.expandProducao ? '▲' : '▼'"></span></button>
          <div class="submenu" v-if="expandProducao">
            <button class="btn btn-sub mb-1">Apontamento de Produção</button>
            <button class="btn btn-sub mb-1">Não Conformidade</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Menu',
  components: { Navbar },
  data () {
    return {
      expandAlmoxarifado: false,
      expandComercial: false,
      expandProducao: false,
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      
    }
  },
  methods: {
    handleSubmit () {
    
    },
    triggerAlmoxarifado () {
      this.expandAlmoxarifado = !this.expandAlmoxarifado
    },
    triggerComercial () {
      this.expandComercial = !this.expandComercial
    },
    triggerProducao () {
      this.expandProducao = !this.expandProducao
    },
    access (form) {
      this.$router.push({ name: form })
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