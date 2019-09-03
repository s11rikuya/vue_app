<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>投稿一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-xs-right>
        <router-link :to="{ name: 'post_edit' }">
          <v-btn color="info">
            投稿追加
          </v-btn>
        </router-link>
      </v-flex>
      <v-container>
        <v-layout class="d-flex">
          <v-flex xs4  v-for="post in posts">
            <v-card>
              <v-card-title>
                <router-link :to="{ name: 'post', params: { post_id: post.id }}">
                  {{ post.title }}
                </router-link>
              </v-card-title>
              <v-card-text>{{ post.content }}</v-card-text>
              <v-card-actions>
                <span>
                  <router-link :to="{ name: 'post_edit', params: { post_id: post.id }}">
                    <v-icon small class="mr-2">edit</v-icon>
                  </router-link>
                </span>
                <span>
                  <v-icon small class="mr-2" @click="deleteConfirm(post.id)">delete</v-icon>
                </span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.posts = this.$store.state.posts
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    deleteConfirm(id) {
      if(confirm('削除してよろしいですか？')){
        this.deletePost({ id })
      }
    },
    ...mapActions(['deletePost'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
