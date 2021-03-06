import emailFilter from '../mister-email/email-filter.cmp.js';
import progressBar from './progress-bar.cmp.js'
import emailService from '../../services/mister-email/email.service.js';
import eventBus, { EMAIL_CHANGE } from '../../services/event-bus.service.js';

export default {
    template: `
    <section class="email-list-nav">
        <progress-bar :progress="progress"></progress-bar>
        <nav>
            <button class="email-nav-btn" @click="composeEmail">compose</button>
        </nav>
        <email-filter></email-filter>
        <input type="text"
                class="search-email-input"
                v-model="filter.byTxt"
                @input.lazy="onChangeFilter"
                placeholder="search...">
    </section>
    `,
    data() {
        return {
            filter: {
                byTxt: '',
                byNew: true,
                isRead: 'all',
            },
            progress: 0,
        }
    },
    created() {
        this.updateProgressBarPrecentage();
        eventBus.$on(EMAIL_CHANGE , this.updateProgressBarPrecentage);
    },
    methods: {
        composeEmail() {
            this.$router.push('/misteremail/compose');            
        },
        updateProgressBarPrecentage() {
            emailService.getProgressBarPrecentage().then(obj => {
                this.progress = Math.round((obj.readEmails / obj.allEmails || 0) * 100);
            })
        }
    },
    components: {
        emailFilter,
        progressBar
    }
}