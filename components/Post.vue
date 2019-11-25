<template>
  <div class="reddit-post">
    <div class="points" :class="voteClass">
      <div class="upvote vote-btn" @click="votePost(1)"></div>
      <div class="vote-count">{{abbreviateNumber(post.score)}}</div>
      <div class="downvote vote-btn" @click="votePost(-1)"></div>
    </div>
    <div
      class="preview"
      v-if="img"
      :style="{backgroundImage:`url(${post.thumbnail})`}"
      role="img"
      :aria-label="post.title"
    ></div>
    <div class="preview blank" v-else></div>
    <div class="post-content">
      <div class="title">{{post.title}}</div>
      <div class="captions">
        Posted by
        <nuxt-link to="/">u/{{post.author}}</nuxt-link>
        {{findTimeAgo(post.created_utc)}} ago to
        <nuxt-link :to="postedTo">{{post.subreddit_name_prefixed}}</nuxt-link>
      </div>
      <div class="actions">
        {{post.num_comments}} Comments |
        <nuxt-link to="/share">Share</nuxt-link>|
        <nuxt-link to="/save">Save</nuxt-link>|
        <nuxt-link to="/hide">Hide</nuxt-link>|
        <nuxt-link to="/hide">Report</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: {
      type: Number
    },
    post: {
      type: Object
    }
  },
  data() {
    return {
      voteClass: this.post.likes
        ? "up"
        : this.post.likes === false
        ? "down"
        : ""
    };
  },
  computed: {
    img() {
      return (
        this.post.thumbnail !== "self" &&
        this.post.thumbnail !== "nsfw" &&
        this.post.thumbnail !== "image" &&
        this.post.thumbnail !== "default" &&
        this.post.thumbnail !== "spoiler"
      );
    },
    postedTo() {
      return {
        name: "r-subreddit",
        params: {
          subreddit: this.post.subreddit
        }
      };
    }
  },
  methods: {
    abbreviateNumber(number) {
      const SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
      // what tier? (determines SI prefix)
      const tier = (Math.log10(Math.abs(number)) / 3) | 0;

      // if zero, we don't need a prefix
      if (tier === 0) {
        return number;
      }

      // get postfix and determine scale
      const postfix = SI_POSTFIXES[tier];
      const scale = Math.pow(10, tier * 3);

      // scale the number
      const scaled = number / scale;

      // format number and add postfix as suffix
      let formatted = scaled.toFixed(1) + "";

      // remove '.0' case
      if (/\.0$/.test(formatted)) {
        formatted = formatted.substr(0, formatted.length - 2);
      }

      return formatted + postfix;
    },
    findTimeAgo(date) {
      const DURATION_IN_SECONDS = {
        epochs: ["year", "month", "day", "hour", "minute"],
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
      };

      function getDuration(seconds) {
        let epoch, interval;

        for (let i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
          epoch = DURATION_IN_SECONDS.epochs[i];
          interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
          if (interval >= 1) {
            return {
              interval: interval,
              epoch: epoch
            };
          }
        }

        return {};
      }

      const seconds = Math.floor((new Date() - new Date(date * 1000)) / 1000);
      const duration = getDuration(seconds);
      const suffix =
        duration.interval > 1 || duration.interval === 0 ? "s" : "";
      return duration.interval + " " + duration.epoch + suffix;
    },
    async votePost(dir) {
      try {
        let score = this.post.score;
        if (this.post.likes) {
          if (dir === -1) {
            score -= 2;
            this.voteClass = "down";
          } else {
            dir = 0;
            score -= 1;
            this.voteClass = "";
          }
        } else if (this.post.likes === false) {
          if (dir === 1) {
            score += 2;
            this.voteClass = "up";
          } else {
            dir = 0;
            score += 1;
            this.voteClass = "";
          }
        } else {
          score += dir;
          this.voteClass = dir === 1 ? "up" : dir === -1 ? "down" : "";
        }
        this.$store.commit(
          `${
            this.$route.name.indexOf("subreddit") > -1 ? "subreddits/" : ""
          }UPDATE_POST`,
          {
            update: {
              score
            },
            idx: this.idx
          }
        );
        await this.$store.dispatch("post/VOTE_POST", {
          id: this.post.name,
          dir
        });
      } catch (ex) {}
    }
  }
};
</script>

<style lang="scss">
.reddit-post {
  display: flex;
  margin-bottom: 20px;

  .points {
    margin-right: 15px;
    padding: 15px 5px;
    .vote-btn {
      width: 36px;
      height: 15px;
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: center;
      cursor: pointer;
    }
    &.up {
      .upvote {
        background-image: url("../assets/upvote_selected.svg");
      }
    }
    &.down {
      .downvote {
        background-image: url("../assets/downvote_selected.svg");
      }
    }
    .upvote {
      background-image: url("../assets/upvote.svg");

      &:hover {
        background-image: url("../assets/upvote_selected.svg");
      }
    }
    .downvote {
      background-image: url("../assets/downvote.svg");
      &:hover {
        background-image: url("../assets/downvote_selected.svg");
      }
    }
    .vote-count {
      font-size: 13px;
      color: #898ea2;
      text-align: center;
    }
  }
  .preview {
    margin-right: 15px;
    min-width: 120px;
    max-height: 80px;
    border-radius: 5px;
    overflow: hidden;
    background-position: 50% top;
    background-repeat: no-repeat;
    background-size: cover;

    &.blank {
      background: #f4f5fa;
      border-radius: 5px;
      background-image: url(../assets/nopreview.svg);
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .post-content {
    padding: 8px 0;
    .title {
      font-weight: 500;
      line-height: 22px;
      constter-spacing: 0.5px;
      color: #464855;
    }
    .captions,
    .actions {
      font-size: 12px;
      line-height: 18px;
      color: #898ea2;

      a {
        color: #898ea2;
        margin-right: 4px;
      }
    }
    .captions {
      margin: 2px 0;
    }
  }
}
</style>