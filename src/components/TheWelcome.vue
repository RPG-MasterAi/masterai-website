<script lang="ts" setup>
import WelcomeItem from "./WelcomeItem.vue";
import InstagramIcon from "./icons/IconInstagram.vue";
import GoFoundMeIcon from "./icons/IconGoFoundMe.vue";
import DiscordIcon from "./icons/IconDiscord.vue";
import YoutubeIcon from "./icons/IconYoutube.vue";
import TikTokIcon from "./icons/IconTikTok.vue";
import IconCompany from "./icons/IconCompany.vue";
import { RouterLink } from "vue-router";
</script>

<template>
    <a href="https://www.instagram.com/rpgmaster.ai" target="_blank">
        <WelcomeItem>
            <template #icon>
                <InstagramIcon />
            </template>
            <template #heading>Instagram</template>

            Follow us on Instagram to get the latest news and updates!
        </WelcomeItem>
    </a>

    <a href="https://gofund.me/f23338aa" target="_blank">
        <WelcomeItem>
            <template #icon>
                <GoFoundMeIcon />
            </template>
            <template #heading>GoFoundMe</template>

            Support us on GoFoundMe to make this project a reality!
        </WelcomeItem>
    </a>

    <a href="https://discord.gg/DdkN5DuYQA" target="_blank">
        <WelcomeItem>
            <template #icon>
                <DiscordIcon />
            </template>
            <template #heading>Discord</template>

            Join our Discord server to chat with the community and the team
            behind MasterAi!
        </WelcomeItem>
    </a>

    <a href="https://www.youtube.com/@rpgMasterAi" target="_blank">
        <WelcomeItem>
            <template #icon>
                <YoutubeIcon />
            </template>
            <template #heading>YouTube</template>

            Follow us on YouTube to get the latest news and updates!
        </WelcomeItem>
    </a>

    <a href="https://www.tiktok.com/@rpgmaster.ai" target="_blank">
        <WelcomeItem>
            <template #icon>
                <TikTokIcon />
            </template>
            <template #heading>TikTok</template>

            Follow us on TikTok to get the latest news and updates!
        </WelcomeItem>
    </a>
    <span>
        <WelcomeItem>
            <template #icon>
                <IconCompany />
            </template>
            <template #heading>Company info</template>
            MASTERAI S.R.L.S.
            <br />
            Via degli aceri 77, 00172 Rome
            <br />
            Italy Tax Code / VAT Number: 17291571002
            <br />
            Share Capital: €500.00 fully paid
            <br />
            <RouterLink to="/privacy"
                >Privacy Policy and Cookie policy
            </RouterLink>
        </WelcomeItem>
    </span>
</template>
