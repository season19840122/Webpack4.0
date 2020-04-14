<template>
  <div class="index" v-cloak>
    <Header />
    <Nav />
    <Home />
    <Footer />
    <Modal/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@components/Header';
import Nav from '@components/Nav';
import Home from './Home';
import Footer from '@components/Footer';
import Modal from '@components/Modal';

export default {
  name: 'index',
  components: {
    Header,
    Nav,
    Home,
    Footer,
    Modal
  },
  methods: {},
  mounted () {
  },
};
</script>

<style lang="scss">
</style>
