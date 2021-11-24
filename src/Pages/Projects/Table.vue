<template>
    <v-card elevation="2" outlined>
        <v-card-title class="mb-6">
            <v-text-field
                v-model="searchModel"
                append-icon="mdi-magnify"
                label="Введите название"
                single-line
                hide-details
                class="pa-0 ma-0"
            ></v-text-field>

            <v-spacer></v-spacer>

            <div class="text-center pa-0 ma-0">
                <v-menu
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon>
                            <v-icon>mdi-filter</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-select
                                    v-model="statusModel"
                                    :items="statuses"
                                    item-text="title_ru"
                                    item-value="id"
                                    menu-props="auto"
                                    label="Статус"
                                    hide-details
                                    single-line
                                >
                                </v-select>
                            </v-list-item>
                            <v-list-item>
                                <v-container class="px-0" fluid>
                                    <v-checkbox
                                        v-model="isPublicModel"
                                        label="Публичный"
                                    ></v-checkbox>
                                </v-container>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
        </v-card-title>

        <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="projects"
            :options.sync="options"
            :server-items-length="totalCount"
            :loading="loading"
            :footer-props="footerProps"
            no-data-text="По указанному запросу данных не найдено"
        >
            <template v-slot:body.append>
                <v-dialog v-model="dialogEdit" width="300px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Изменить статус</span>
                        </v-card-title>

                        <v-card-text class="px-0">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-card flat outlined>
                                            <v-list class="pa-0">
                                                <v-list-item-group
                                                    v-model="statusEditModel"
                                                >
                                                    <v-list-item
                                                        v-for="(
                                                            item, i
                                                        ) in statuses"
                                                        :key="i"
                                                        :disabled="
                                                            item.id ===
                                                            editedItem.status
                                                        "
                                                    >
                                                        <v-list-item-icon>
                                                            <v-icon
                                                                v-text="
                                                                    item.icon
                                                                "
                                                                :color="
                                                                    statusColor(
                                                                        item.id
                                                                    )
                                                                "
                                                            ></v-icon>
                                                        </v-list-item-icon>

                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                                v-text="
                                                                    item.title_ru
                                                                "
                                                            ></v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Отмена
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Сохранить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>

            <template v-slot:item.status="{ item }">
                <v-chip text-color="white" :color="statusColor(item.status)">{{
                    statusTitle(item.status)
                }}</v-chip>
            </template>

            <template v-slot:item.isPublic="{ item }">
                <v-icon small>
                    {{ visibilityIcon(item.isPublic) }}
                </v-icon>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
            </template>

            <template v-slot:footer.page-text="props">
                {{ props.pageStart }} - {{ props.pageStop }} из
                {{ props.itemsLength }}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
// Store types
import {
    ALERT,
    CURRENT_PAGE,
    PROJECTS,
    SET_TABLE_LOADING,
    TOTAL_PAGES,
    UPDATE_PROJECTS,
} from "@/store/types";

export default {
    props: {
        projects: Array,
    },
    data() {
        return {
            dialogEdit: false,
            editedItem: {},
            footerProps: {
                "items-per-page-text": "На странице",
                "disable-items-per-page": true,
            },
            headers: [
                {
                    text: "Название",
                    sortable: false,
                    align: "start",
                    value: "title",
                },
                { text: "Город", sortable: false, value: "city" },
                {
                    text: "Дата создания",
                    sortable: false,
                    value: "creationDate",
                },
                {
                    text: "Статус",
                    sortable: false,
                    align: "center",
                    value: "status",
                },
                {
                    text: "Публичный",
                    sortable: false,
                    align: "center",
                    value: "isPublic",
                },
                {
                    text: "Действия",
                    align: "center",
                    value: "actions",
                    sortable: false,
                },
            ],
            isPublicFilter: false,
            newStatus: null,
            options: {
                itemsPerPage: 10,
            },
            search: "",
            statusFilter: null,
            requestError: false,
            statuses: [
                {
                    id: 0,
                    title_ru: "Проект",
                    title_en: "Draft",
                    color: "grey",
                    icon: "mdi-clipboard-text",
                },
                {
                    id: 1,
                    title_ru: "В работе",
                    title_en: "Active",
                    color: "orange",
                    icon: "mdi-clipboard-flow",
                },
                {
                    id: 2,
                    title_ru: "Окончен",
                    title_en: "Finished",
                    color: "green",
                    icon: "mdi-clipboard-check",
                },
                {
                    id: 3,
                    title_ru: "Архивный",
                    title_en: "Archive",
                    color: "yellow",
                    icon: "mdi-archive",
                },
                {
                    id: 4,
                    title_ru: "Отменен",
                    title_en: "Canceled",
                    color: "red",
                    icon: "mdi-cancel",
                },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi();
            },
            deep: true,
        },
    },
    computed: {
        currentPage() {
            return this.$store.state.siis.currentPage;
        },
        searchModel: {
            set: function (val) {
                this.search = val;
                this.getDataFromApi();
            },
            get: function () {
                return this.search;
            },
        },
        statusEditModel: {
            set: function (val) {
                this.newStatus = val;
            },
            get: function () {
                return this.editedItem.status;
            },
        },
        statusModel: {
            set: function (val) {
                this.statusFilter = val;
                this.getDataFromApi();
            },
            get: function () {
                return this.statusFilter;
            },
        },
        isPublicModel: {
            set: function (val) {
                this.isPublicFilter = val;
                this.getDataFromApi();
            },
            get: function () {
                return this.isPublicFilter;
            },
        },
        loading() {
            return this.$store.state.siis.tableLoading;
        },
        siisApi() {
            return this.$store.state.config.api.siis.baseUrl;
        },
        totalCount() {
            return this.$store.state.siis.totalCount;
        },
    },
    methods: {
        close() {
            this.dialogEdit = false;
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
        },
        getDataFromApi() {
            this.$store.commit(SET_TABLE_LOADING, true);

            const { sortBy, sortDesc, page, itemsPerPage } = this.options;

            if (this.search) {
                var title = this.search;
            }

            if (this.statusFilter !== null) {
                var status = this.statusFilter;
            }

            if (this.isPublicFilter !== null) {
                var isPublic = this.isPublicFilter;
            }

            this.$axios
                .get(`${this.siisApi}/projects`, {
                    params: { page, title, status, isPublic },
                })
                .then((response) => {
                    if (response.status !== 200) {
                        return this.$store.commit(ALERT, {
                            show: true,
                            message:
                                "Не удалось загрузить данные. Пожалуйста, попробуйте позже",
                            type: "error",
                        });
                    }

                    const data = response.data;

                    this.$store.commit(PROJECTS, data.projects);

                    if (!data.projects.length) {
                        return;
                    }

                    if (data.currentPage) {
                        this.$store.commit(CURRENT_PAGE, data.currentPage);
                    }

                    if (data.totalCount) {
                        this.$store.commit(TOTAL_PAGES, data.totalCount);
                    }

                    let items = this.projects;

                    if (sortBy.length === 1 && sortDesc.length === 1) {
                        items = items.sort((a, b) => {
                            const sortA = a[sortBy[0]];
                            const sortB = b[sortBy[0]];

                            if (sortDesc[0]) {
                                if (sortA < sortB) return 1;
                                if (sortA > sortB) return -1;
                                return 0;
                            } else {
                                if (sortA < sortB) return -1;
                                if (sortA > sortB) return 1;
                                return 0;
                            }
                        });
                    }

                    if (itemsPerPage > 0) {
                        items = items.slice(
                            (page - 1) * itemsPerPage,
                            page * itemsPerPage
                        );
                    }
                })
                .catch((error) => {
                    return this.$store.commit(ALERT, {
                        show: true,
                        message:
                            "Не удалось загрузить данные. Пожалуйста, попробуйте позже",
                        type: "error",
                    });
                })
                .finally(() => {
                    this.$store.commit(SET_TABLE_LOADING, false);
                });
        },
        editItem(item) {
            this.editedIndex = this.projects.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogEdit = true;
            this.newStatus = item.status;
        },
        save() {
            if (this.editedIndex > -1) {
                let data = (data = new FormData());
                data.append("projectId", this.editedItem.id);
                data.append("status", this.newStatus);

                this.$store.commit(SET_TABLE_LOADING, true);
                this.$axios
                    .post(`${this.siisApi}/projects/setProjectStatus`, data)
                    .then((response) => {
                        if (response.status !== 200) {
                            return this.$store.commit(ALERT, {
                                show: true,
                                message:
                                    "Не удалось загрузить данные. Пожалуйста, попробуйте позже",
                                type: "error",
                            });
                        }

                        const data = response.data;

                        if (!data.isSuccess) {
                            return this.$store.commit(ALERT, {
                                show: true,
                                message: data.errorMessage,
                                type: "error",
                            });
                        }

                        this.editedItem.status = this.newStatus;
                        this.$store.commit(UPDATE_PROJECTS, {
                            index: this.editedIndex,
                            item: this.editedItem,
                        });

                        this.$store.commit(ALERT, {
                            show: true,
                            message: "Статус успешно изменен",
                            type: "success",
                        });

                        this.close();
                    })
                    .catch((error) => {
                        return this.$store.commit(ALERT, {
                            show: true,
                            message:
                                "Не удалось загрузить данные. Пожалуйста, попробуйте позже",
                            type: "error",
                        });
                    })
                    .finally(() => {
                        this.$store.commit(SET_TABLE_LOADING, false);
                    });
            }
        },
        statusColor(status) {
            var color = "";

            switch (status) {
                case 0:
                    color = "grey"; // Draft
                    break;
                case 1:
                    color = "yellow accent-4"; // Active
                    break;
                case 2:
                    color = "green"; // Finished
                    break;
                case 3:
                    color = "orange"; // Archive
                    break;
                case 4:
                    color = "red"; // Canceled
                    break;

                default:
                    break;
            }

            return color;
        },
        statusTitle(status) {
            var title = "";

            switch (status) {
                case 0:
                    title = "Проект";
                    break;
                case 1:
                    title = "В работе";
                    break;
                case 2:
                    title = "Окончен";
                    break;
                case 3:
                    title = "Архивный";
                    break;
                case 4:
                    title = "Отменен";
                    break;

                default:
                    break;
            }

            return title;
        },
        visibilityIcon(isPublic) {
            return isPublic ? "mdi-check" : "";
        },
    },
};
</script>