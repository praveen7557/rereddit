<template>
  <div class="reddit-post">
    <div class="points">
      <div class="upvote vote-btn"></div>
      <div class="vote-count">{{post.ups}}</div>
      <div class="downvote vote-btn"></div>
    </div>
    <div class="preview" :style="{backgroundImage:`url(${post.thumbnail})`}"></div>
    <div class="post-content">
      <div class="title">{{post.title}}</div>
      <div class="captions">
        Posted by
        <nuxt-link to="/">u/{{post.author}}</nuxt-link>1 hour ago to
        <nuxt-link to="/">{{post.subreddit_name_prefixed}}</nuxt-link>
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
  data() {
    return {
      post: {
        approved_at_utc: null,
        subreddit: "hyderabad",
        selftext: "",
        author_fullname: "t2_zm0ecm7",
        saved: false,
        mod_reason_title: null,
        gilded: 0,
        clicked: false,
        title: "An old video, capturing the spirit of Hyderabad.",
        link_flair_richtext: [],
        subreddit_name_prefixed: "r/hyderabad",
        hidden: false,
        pwls: null,
        link_flair_css_class: null,
        downs: 0,
        thumbnail_height: 105,
        hide_score: true,
        name: "t3_dygsmg",
        quarantine: false,
        link_flair_text_color: "dark",
        author_flair_background_color: null,
        subreddit_type: "public",
        ups: 8,
        total_awards_received: 0,
        media_embed: {},
        thumbnail_width: 140,
        author_flair_template_id: null,
        is_original_content: false,
        user_reports: [],
        secure_media: {
          reddit_video: {
            fallback_url:
              "https://v.redd.it/isw58e3x9lz31/DASH_720?source=fallback",
            height: 720,
            width: 960,
            scrubber_media_url: "https://v.redd.it/isw58e3x9lz31/DASH_96",
            dash_url: "https://v.redd.it/isw58e3x9lz31/DASHPlaylist.mpd",
            duration: 190,
            hls_url: "https://v.redd.it/isw58e3x9lz31/HLSPlaylist.m3u8",
            is_gif: false,
            transcoding_status: "completed"
          }
        },
        is_reddit_media_domain: true,
        is_meta: false,
        category: null,
        secure_media_embed: {},
        link_flair_text: null,
        can_mod_post: false,
        score: 8,
        approved_by: null,
        thumbnail:
          "https://b.thumbs.redditmedia.com/01XCtU6oEkJxPKbFmdhZhnA9Ln92jblyRWpkJcpduhM.jpg",
        edited: false,
        author_flair_css_class: null,
        steward_reports: [],
        author_flair_richtext: [],
        gildings: {},
        post_hint: "hosted:video",
        content_categories: null,
        is_self: false,
        mod_note: null,
        created: 1574174538.0,
        link_flair_type: "text",
        wls: null,
        banned_by: null,
        author_flair_type: "text",
        domain: "v.redd.it",
        allow_live_comments: false,
        selftext_html: null,
        likes: null,
        suggested_sort: null,
        banned_at_utc: null,
        view_count: null,
        archived: false,
        no_follow: false,
        is_crosspostable: true,
        pinned: false,
        over_18: false,
        preview: {
          images: [
            {
              source: {
                url:
                  "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?format=pjpg&amp;auto=webp&amp;s=37ecd1cbcc6ca46f1d67acda29ef8638ee624b61",
                width: 960,
                height: 720
              },
              resolutions: [
                {
                  url:
                    "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d0d1e08051ba748caf0dae36d533c1c7f3a8d968",
                  width: 108,
                  height: 81
                },
                {
                  url:
                    "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=b75ec362666b3b858d8e94d035612f046273e355",
                  width: 216,
                  height: 162
                },
                {
                  url:
                    "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=7c566a5a4dfdbaa6d50a5e858a5b74f0e1723b3e",
                  width: 320,
                  height: 240
                },
                {
                  url:
                    "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?width=640&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=bff166b50b9abd6f06daf12577b29de3be47a0c0",
                  width: 640,
                  height: 480
                },
                {
                  url:
                    "https://external-preview.redd.it/1zWEiuKU2njfNLih88S8x8_zpMI4eCmnqTDXAT65sDo.png?width=960&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=c20065f45de9e76291272f275f683faecda01627",
                  width: 960,
                  height: 720
                }
              ],
              variants: {},
              id: "Dt6N28-vJ_l1hYgqOipn_bBQ7kxBr8gK35N7SWseoKw"
            }
          ],
          enabled: false
        },
        all_awardings: [],
        awarders: [],
        media_only: false,
        can_gild: true,
        spoiler: false,
        locked: false,
        author_flair_text: null,
        visited: false,
        removed_by: null,
        num_reports: null,
        distinguished: null,
        subreddit_id: "t5_2r749",
        mod_reason_by: null,
        removal_reason: null,
        link_flair_background_color: "",
        id: "dygsmg",
        is_robot_indexable: true,
        report_reasons: null,
        author: "reva_r",
        discussion_type: null,
        num_comments: 0,
        send_replies: true,
        whitelist_status: null,
        contest_mode: false,
        mod_reports: [],
        author_patreon_flair: false,
        author_flair_text_color: null,
        permalink:
          "/r/hyderabad/comments/dygsmg/an_old_video_capturing_the_spirit_of_hyderabad/",
        parent_whitelist_status: null,
        stickied: false,
        url: "https://v.redd.it/isw58e3x9lz31",
        subreddit_subscribers: 6534,
        created_utc: 1574145738.0,
        num_crossposts: 0,
        media: {
          reddit_video: {
            fallback_url:
              "https://v.redd.it/isw58e3x9lz31/DASH_720?source=fallback",
            height: 720,
            width: 960,
            scrubber_media_url: "https://v.redd.it/isw58e3x9lz31/DASH_96",
            dash_url: "https://v.redd.it/isw58e3x9lz31/DASHPlaylist.mpd",
            duration: 190,
            hls_url: "https://v.redd.it/isw58e3x9lz31/HLSPlaylist.m3u8",
            is_gif: false,
            transcoding_status: "completed"
          }
        },
        is_video: true
      }
    };
  }
};
</script>

<style lang="scss">
.reddit-post {
  display: flex;
  height: 80px;
  margin-bottom: 20px;

  .points {
    margin-right: 15px;
    padding: 15px 5px;
    .vote-btn {
      width: 25px;
      height: 15px;
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: center;
      fill: #ffaaff;
    }
    .upvote {
      background-image: url("../assets/upvote.svg");
    }
    .downvote {
      background-image: url("../assets/downvote.svg");
    }
    .vote-count {
      font-size: 13px;
      color: #898ea2;
      text-align: center;
    }
  }
  .preview {
    margin-right: 15px;
    width: 120px;
    border-radius: 5px;
    overflow: hidden;
    background-position: 50% top;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .post-content {
    padding: 8px 0;
    .title {
      font-weight: 500;
      line-height: 25px;
      letter-spacing: 0.5px;
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