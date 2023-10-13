<template>
  <div class="modal">
    <div class="modal-inner">      
      <NaoConformidade :showNavBar="false" origem="assistencia" @finalizar="finalizar" />    
      <button type="button" class="btn btn-secondary btn-sm float-end mt-2" @click="close">Fechar</button>
    </div>
  </div>
</template>

<script>
import NaoConformidade from '../views/NaoConformidade.vue'

export default {  
  components: { NaoConformidade },
  methods: {
    close() {
      this.$emit("close", '');
    },
    finalizar(numRnc) {
      this.$emit("close", numRnc);
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-inner {  
  background-color: white;
  border-radius: 0.5em;
  padding: 2em;
  margin: auto;
}
</style>