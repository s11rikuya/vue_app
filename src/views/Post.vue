<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>投稿編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="post.title" label="題名"></v-text-field>
              <v-textarea
              v-model="post.content"
              name="input-7-1"
              label="内容"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              hint="Hint text"
              ></v-textarea>
              <v-btn @click="$router.push({ name: 'posts' })">キャンセル</v-btn>
              <v-btn color="info" @click="submit">保存</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    if(!this.$route.params.post_id) return
    const post = this.$store.getters.getPostById(this.$route.params.post_id)
    if (post) {
      this.post = post
    } else {
      this.$router.push({ name: 'posts' })

    }
  },
  data () {
    return {
      post: {}
    }
  },
  methods: {
    submit() {
      if(this.$route.params.post_id) {
        this.updatePost({ id: this.$route.params.post_id, post: this.post })
      } else {
        this.addPost(this.post)
      }
      this.$router.push({name: 'posts'})
      this.post = {}
    },
    ...mapActions(['addPost', 'updatePost'])

  }
}
</script>
