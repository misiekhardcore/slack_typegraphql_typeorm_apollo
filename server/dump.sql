--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: channel_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channel_member (
    user_id integer NOT NULL,
    channel_id integer NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.channel_member OWNER TO postgres;

--
-- Name: channel_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channel_user (
    user_id integer NOT NULL,
    channel_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.channel_user OWNER TO postgres;

--
-- Name: channels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying NOT NULL,
    is_public boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    team_id integer NOT NULL,
    is_dm boolean DEFAULT false NOT NULL
);


ALTER TABLE public.channels OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_id_seq OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: direct_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direct_messages (
    id integer NOT NULL,
    text text,
    team_id integer NOT NULL,
    user_from_id integer NOT NULL,
    user_to_id integer NOT NULL,
    file_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.direct_messages OWNER TO postgres;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.direct_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direct_messages_id_seq OWNER TO postgres;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.direct_messages_id_seq OWNED BY public.direct_messages.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer NOT NULL,
    filename character varying NOT NULL,
    mimetype character varying NOT NULL,
    encoding character varying NOT NULL,
    url character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    text text,
    channel_id integer NOT NULL,
    user_id integer NOT NULL,
    file_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: team_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team_member (
    user_id integer NOT NULL,
    team_id integer NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team_member OWNER TO postgres;

--
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_id_seq OWNER TO postgres;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: direct_messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages ALTER COLUMN id SET DEFAULT nextval('public.direct_messages_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: channel_member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channel_member (user_id, channel_id, admin, created_at, updated_at) FROM stdin;
2	49	f	2021-11-09 15:34:31.155149	2021-11-09 15:34:31.155149
1	49	t	2021-11-09 15:34:31.155149	2021-11-09 15:34:31.155149
3	50	f	2021-11-09 15:34:50.832284	2021-11-09 15:34:50.832284
1	50	t	2021-11-09 15:34:50.832284	2021-11-09 15:34:50.832284
2	51	f	2021-11-09 15:35:54.571282	2021-11-09 15:35:54.571282
3	51	f	2021-11-09 15:35:54.571282	2021-11-09 15:35:54.571282
1	51	t	2021-11-09 15:35:54.571282	2021-11-09 15:35:54.571282
2	35	f	2021-11-07 19:27:00.226734	2021-11-07 19:27:00.226734
1	35	t	2021-11-07 19:27:00.226734	2021-11-07 19:27:00.226734
\.


--
-- Data for Name: channel_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channel_user (user_id, channel_id, created_at, updated_at, admin) FROM stdin;
\.


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channels (id, name, is_public, created_at, updated_at, team_id, is_dm) FROM stdin;
33	general	t	2021-11-07 19:26:24.426345	2021-11-07 19:26:24.426345	4	f
34	public channel	t	2021-11-07 19:26:49.080055	2021-11-07 19:26:49.080055	4	f
35	private channel	f	2021-11-07 19:27:00.230925	2021-11-07 19:27:00.230925	4	f
49	user12	f	2021-11-09 15:34:31.165251	2021-11-09 15:34:31.165251	4	t
50	user13	f	2021-11-09 15:34:50.838071	2021-11-09 15:34:50.838071	4	t
51	user12, user13	f	2021-11-09 15:35:54.577086	2021-11-09 15:35:54.577086	4	t
52	general	t	2021-11-10 21:26:33.412378	2021-11-10 21:26:33.412378	5	f
53	general	t	2021-11-13 17:40:46.186278	2021-11-13 17:40:46.186278	6	f
\.


--
-- Data for Name: direct_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direct_messages (id, text, team_id, user_from_id, user_to_id, file_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, filename, mimetype, encoding, url, created_at, updated_at) FROM stdin;
1	Zrzut ekranu z 2021-10-15 13-59-37.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-15 13-59-37.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
2	Zrzut ekranu z 2021-10-15 13-59-37.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-15 13-59-37.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
3	Zrzut ekranu z 2021-10-15 13-59-37.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-15 13-59-37.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
4	Zrzut ekranu z 2021-10-15 13-59-37.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-15 13-59-37.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
5	Zrzut ekranu z 2021-10-20 10-12-33.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-20 10-12-33.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
6	Zrzut ekranu z 2021-10-18 11-58-43.png	image/png	7bit	/files/Zrzut ekranu z 2021-10-18 11-58-43.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
7	163560201959650334.35068514595	image/png	7bit	/files/163560201959650334.35068514595	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
8	163560217307746460.33740884603.png	image/png	7bit	/files/163560217307746460.33740884603.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
9	16356887803541857.3105962478742.png	image/png	7bit	/files/16356887803541857.3105962478742.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
10	163568881160835893.97232725653.png	image/png	7bit	/files/163568881160835893.97232725653.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
11	163568901262591577.68140180071.png	image/png	7bit	/files/163568901262591577.68140180071.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
12	16356900708217552.428672891831.png	image/png	7bit	/files/16356900708217552.428672891831.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
13	163569081295692663.14599991756.png	image/png	7bit	/files/163569081295692663.14599991756.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
14	163569125222020252.249284166603.png	image/png	7bit	/files/163569125222020252.249284166603.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
15	163569299117772080.9640506046.jpg	image/jpeg	7bit	/files/163569299117772080.9640506046.jpg	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
16	163569391917644549.460651290705.mp3	audio/mpeg	7bit	/files/163569391917644549.460651290705.mp3	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
17	163569422440334863.037788209025.mp3	audio/mpeg	7bit	/files/163569422440334863.037788209025.mp3	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
18	163629027570283630.79056450089.png	image/png	7bit	/files/163629027570283630.79056450089.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
19	16362902969904618.7702086980535.png	image/png	7bit	/files/16362902969904618.7702086980535.png	2021-11-07 14:07:22.647936	2021-11-07 14:07:22.647936
20	163629045802779297.9268066412.png	image/png	7bit	/files/163629045802779297.9268066412.png	2021-11-07 14:07:38.038321	2021-11-07 14:07:38.038321
21	163629051680288315.08874596545.png	image/png	7bit	/files/163629051680288315.08874596545.png	2021-11-07 14:08:36.803592	2021-11-07 14:08:36.803592
22	16362905266871926.5315481076018.png	image/png	7bit	/files/16362905266871926.5315481076018.png	2021-11-07 14:08:46.688491	2021-11-07 14:08:46.688491
23	163649058800448611.79270116927.png	image/png	7bit	/files/163649058800448611.79270116927.png	2021-11-09 21:43:08.006108	2021-11-09 21:43:08.006108
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, text, channel_id, user_id, file_id, created_at, updated_at) FROM stdin;
192	1	33	3	\N	2021-11-09 19:53:55.952495	2021-11-09 19:53:55.952495
193	2	33	3	\N	2021-11-09 19:53:56.24386	2021-11-09 19:53:56.24386
194	3	33	3	\N	2021-11-09 19:53:56.521024	2021-11-09 19:53:56.521024
195	4	33	3	\N	2021-11-09 19:53:56.812541	2021-11-09 19:53:56.812541
196	5	33	3	\N	2021-11-09 19:53:57.082304	2021-11-09 19:53:57.082304
197	6	33	3	\N	2021-11-09 19:53:57.332653	2021-11-09 19:53:57.332653
198	7	33	3	\N	2021-11-09 19:53:57.566961	2021-11-09 19:53:57.566961
199	8	33	3	\N	2021-11-09 19:53:57.843688	2021-11-09 19:53:57.843688
200	9	33	3	\N	2021-11-09 19:53:58.174337	2021-11-09 19:53:58.174337
201	10	33	3	\N	2021-11-09 19:54:00.221321	2021-11-09 19:54:00.221321
202	11	33	3	\N	2021-11-09 19:54:00.895808	2021-11-09 19:54:00.895808
203	12	33	3	\N	2021-11-09 19:54:01.594296	2021-11-09 19:54:01.594296
204	13	33	3	\N	2021-11-09 19:54:02.52286	2021-11-09 19:54:02.52286
205	14	33	3	\N	2021-11-09 19:54:03.289618	2021-11-09 19:54:03.289618
206	15	33	3	\N	2021-11-09 19:54:04.002371	2021-11-09 19:54:04.002371
207	16	33	3	\N	2021-11-09 19:54:04.696267	2021-11-09 19:54:04.696267
208	17	33	3	\N	2021-11-09 19:54:06.525297	2021-11-09 19:54:06.525297
209	18	33	3	\N	2021-11-09 19:54:08.156469	2021-11-09 19:54:08.156469
210	19	33	3	\N	2021-11-09 19:54:08.813703	2021-11-09 19:54:08.813703
211	20	33	3	\N	2021-11-09 19:54:09.819446	2021-11-09 19:54:09.819446
212	21	33	3	\N	2021-11-09 19:54:11.131755	2021-11-09 19:54:11.131755
213	22	33	3	\N	2021-11-09 19:54:11.74508	2021-11-09 19:54:11.74508
214	23	33	3	\N	2021-11-09 19:54:12.333632	2021-11-09 19:54:12.333632
215	24	33	3	\N	2021-11-09 19:54:13.050423	2021-11-09 19:54:13.050423
216	25	33	3	\N	2021-11-09 19:54:13.618599	2021-11-09 19:54:13.618599
217	26	33	3	\N	2021-11-09 19:54:14.371892	2021-11-09 19:54:14.371892
218	27	33	3	\N	2021-11-09 19:54:15.031014	2021-11-09 19:54:15.031014
219	28	33	3	\N	2021-11-09 19:54:15.894365	2021-11-09 19:54:15.894365
220	29	33	3	\N	2021-11-09 19:54:17.174468	2021-11-09 19:54:17.174468
221	30	33	3	\N	2021-11-09 19:54:19.390044	2021-11-09 19:54:19.390044
222	31	33	3	\N	2021-11-09 19:54:21.150274	2021-11-09 19:54:21.150274
223	32	33	3	\N	2021-11-09 19:54:21.941191	2021-11-09 19:54:21.941191
224	33	33	3	\N	2021-11-09 19:54:22.915349	2021-11-09 19:54:22.915349
225	34	33	3	\N	2021-11-09 19:54:23.668311	2021-11-09 19:54:23.668311
226	35	33	3	\N	2021-11-09 19:54:24.347582	2021-11-09 19:54:24.347582
227	36	33	3	\N	2021-11-09 19:54:25.010676	2021-11-09 19:54:25.010676
228	37	33	3	\N	2021-11-09 19:54:25.694387	2021-11-09 19:54:25.694387
229	38	33	3	\N	2021-11-09 19:54:26.388668	2021-11-09 19:54:26.388668
230	39	33	3	\N	2021-11-09 19:54:27.145194	2021-11-09 19:54:27.145194
231	40	33	3	\N	2021-11-09 19:54:29.776553	2021-11-09 19:54:29.776553
232	41	33	3	\N	2021-11-09 21:25:37.552291	2021-11-09 21:25:37.552291
233	42	33	3	\N	2021-11-09 21:25:39.472284	2021-11-09 21:25:39.472284
234	43	33	3	\N	2021-11-09 21:25:40.040742	2021-11-09 21:25:40.040742
235	44	33	3	\N	2021-11-09 21:25:41.992281	2021-11-09 21:25:41.992281
236	45	33	3	\N	2021-11-09 21:25:42.592142	2021-11-09 21:25:42.592142
237	46	33	3	\N	2021-11-09 21:25:43.084603	2021-11-09 21:25:43.084603
238	47	33	3	\N	2021-11-09 21:25:43.88624	2021-11-09 21:25:43.88624
239	asd	34	3	\N	2021-11-09 21:35:16.944737	2021-11-09 21:35:16.944737
240	48	33	3	\N	2021-11-09 21:39:36.033994	2021-11-09 21:39:36.033994
241	49	33	3	\N	2021-11-09 21:40:40.579765	2021-11-09 21:40:40.579765
242		33	3	23	2021-11-09 21:43:08.011003	2021-11-09 21:43:08.011003
243	s	53	3	\N	2021-11-13 17:40:51.887062	2021-11-13 17:40:51.887062
244	sd	53	3	\N	2021-11-13 17:40:52.049321	2021-11-13 17:40:52.049321
245	f	53	3	\N	2021-11-13 17:40:52.191108	2021-11-13 17:40:52.191108
246	sdf	53	3	\N	2021-11-13 17:40:52.356795	2021-11-13 17:40:52.356795
247	as	53	3	\N	2021-11-13 17:40:52.509783	2021-11-13 17:40:52.509783
248	d	53	3	\N	2021-11-13 17:40:52.677756	2021-11-13 17:40:52.677756
249	fas	53	3	\N	2021-11-13 17:40:53.263147	2021-11-13 17:40:53.263147
250	f	53	3	\N	2021-11-13 17:40:53.482848	2021-11-13 17:40:53.482848
251	f	53	3	\N	2021-11-13 17:40:53.711687	2021-11-13 17:40:53.711687
252	d	53	3	\N	2021-11-13 17:40:53.947789	2021-11-13 17:40:53.947789
253	s	53	3	\N	2021-11-13 17:40:54.198227	2021-11-13 17:40:54.198227
254	s	53	3	\N	2021-11-13 17:40:54.475023	2021-11-13 17:40:54.475023
255	g	53	3	\N	2021-11-13 17:40:55.035495	2021-11-13 17:40:55.035495
256	g	53	3	\N	2021-11-13 17:40:55.303287	2021-11-13 17:40:55.303287
257	r	53	3	\N	2021-11-13 17:40:55.805115	2021-11-13 17:40:55.805115
258	e	53	3	\N	2021-11-13 17:40:56.365622	2021-11-13 17:40:56.365622
259	g	53	3	\N	2021-11-13 17:40:56.724984	2021-11-13 17:40:56.724984
260	b	53	3	\N	2021-11-13 17:40:56.96533	2021-11-13 17:40:56.96533
261	d	53	3	\N	2021-11-13 17:40:57.223234	2021-11-13 17:40:57.223234
262	f	53	3	\N	2021-11-13 17:40:57.520768	2021-11-13 17:40:57.520768
263	vasd	53	3	\N	2021-11-13 17:40:59.492376	2021-11-13 17:40:59.492376
264	dsa	53	3	\N	2021-11-13 17:41:00.270339	2021-11-13 17:41:00.270339
265	qwe	53	3	\N	2021-11-13 17:41:01.245748	2021-11-13 17:41:01.245748
266	ewq	53	3	\N	2021-11-13 17:41:02.207076	2021-11-13 17:41:02.207076
267	ert	53	3	\N	2021-11-13 17:41:03.214105	2021-11-13 17:41:03.214105
268	ytr	53	3	\N	2021-11-13 17:41:04.420975	2021-11-13 17:41:04.420975
269	tyu	53	3	\N	2021-11-13 17:41:05.446012	2021-11-13 17:41:05.446012
270	iuy	53	3	\N	2021-11-13 17:41:06.580985	2021-11-13 17:41:06.580985
271	uio	53	3	\N	2021-11-13 17:41:07.924667	2021-11-13 17:41:07.924667
272	ytr	53	3	\N	2021-11-13 17:41:08.924889	2021-11-13 17:41:08.924889
273	rty	53	3	\N	2021-11-13 17:41:09.846355	2021-11-13 17:41:09.846355
\.


--
-- Data for Name: team_member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team_member (user_id, team_id, admin, created_at, updated_at) FROM stdin;
1	4	t	2021-11-07 19:26:24.435234	2021-11-07 19:26:24.435234
2	4	f	2021-11-07 19:26:32.51805	2021-11-07 19:26:32.51805
3	4	f	2021-11-07 19:26:38.52404	2021-11-07 19:26:38.52404
4	4	f	2021-11-09 13:40:43.834736	2021-11-09 13:40:43.834736
1	5	t	2021-11-10 21:26:33.426415	2021-11-10 21:26:33.426415
3	6	t	2021-11-13 17:40:46.193375	2021-11-13 17:40:46.193375
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (id, name, created_at, updated_at) FROM stdin;
4	user11team	2021-11-07 19:26:24.421949	2021-11-07 19:26:24.421949
5	second team	2021-11-10 21:26:33.395077	2021-11-10 21:26:33.395077
6	team	2021-11-13 17:40:46.177845	2021-11-13 17:40:46.177845
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, created_at, updated_at, is_admin) FROM stdin;
1	user11	user11@mail.com	$argon2i$v=19$m=4096,t=3,p=1$IAO3ErS9E4cs/fhXrTlp6g$z8Rw6EjoZYH9nKNQLRmBbr/vjdSMIyIYgG5VkDmZfBw	2021-10-30 15:24:38.529613	2021-10-30 15:24:38.529613	f
2	user12	user12@mail.com	$argon2i$v=19$m=4096,t=3,p=1$Wwg6kge+CutWq5BhZ0M9hw$yvNH62c9C/m3fzSxqREIcCZc7QSSnwd0qxtE+LcT9T0	2021-10-31 16:56:41.10808	2021-10-31 16:56:41.10808	f
3	user13	user13@mail.com	$argon2i$v=19$m=4096,t=3,p=1$O5OcBs1p4B4zc9/BZGXP0g$Czbff9m9u/04Df+FzdaKCNUADzQ/yF51agTfS40/PdI	2021-11-02 21:32:42.653058	2021-11-02 21:32:42.653058	f
4	user14	user14@mail.com	$argon2i$v=19$m=4096,t=3,p=1$vJ9pJfpFbeEVBsmT5pn5uA$1m3DzwvFXemD2TwDvR5qlVKOVgm9Kx99I1R2mzGOdh8	2021-11-09 13:40:31.570396	2021-11-09 13:40:31.570396	f
\.


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channels_id_seq', 53, true);


--
-- Name: direct_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.direct_messages_id_seq', 8, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 23, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 273, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: messages PK_18325f38ae6de43878487eff986; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY (id);


--
-- Name: team_member PK_34169355c6d1744228f5bb75549; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT "PK_34169355c6d1744228f5bb75549" PRIMARY KEY (user_id, team_id);


--
-- Name: files PK_6c16b9093a142e0e7613b04a3d9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY (id);


--
-- Name: teams PK_7e5523774a38b08a6236d322403; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id);


--
-- Name: direct_messages PK_8373c1bb93939978ef05ae650d1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "PK_8373c1bb93939978ef05ae650d1" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: channels PK_bc603823f3f741359c2339389f9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "PK_bc603823f3f741359c2339389f9" PRIMARY KEY (id);


--
-- Name: channel_user PK_c3681a05da7ffddb5e358e6fd4c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT "PK_c3681a05da7ffddb5e358e6fd4c" PRIMARY KEY (user_id, channel_id);


--
-- Name: channel_member PK_edb8fe647ddc36f407f06812cd6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT "PK_edb8fe647ddc36f407f06812cd6" PRIMARY KEY (user_id, channel_id);


--
-- Name: direct_messages REL_289bb709afe47fff40068e5187; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "REL_289bb709afe47fff40068e5187" UNIQUE (file_id);


--
-- Name: messages REL_fcce42c9a20b120df9a5b67256; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "REL_fcce42c9a20b120df9a5b67256" UNIQUE (file_id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: IDX_0777b63da90c27d6ed993dc60b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0777b63da90c27d6ed993dc60b" ON public.messages USING btree (created_at);


--
-- Name: team_member FK_0724b86622f89c433dee4cd8b17; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT "FK_0724b86622f89c433dee4cd8b17" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: direct_messages FK_289bb709afe47fff40068e5187a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "FK_289bb709afe47fff40068e5187a" FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- Name: direct_messages FK_79f04f2cfbfaf95f8463b6a6f1c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c" FOREIGN KEY (user_from_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: channels FK_82ec8fc4ec07ccb4a35f8eb9abb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "FK_82ec8fc4ec07ccb4a35f8eb9abb" FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: messages FK_830a3c1d92614d1495418c46736; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages FK_86b9109b155eb70c0a2ca3b4b6d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_86b9109b155eb70c0a2ca3b4b6d" FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: direct_messages FK_8bbe296cf741548c8f9a8ab3a5f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "FK_8bbe296cf741548c8f9a8ab3a5f" FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_member FK_a1b5b4f5fa1b7f890d0a278748b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT "FK_a1b5b4f5fa1b7f890d0a278748b" FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: channel_user FK_a846c7202b4f59da68ad20af060; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT "FK_a846c7202b4f59da68ad20af060" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: channel_member FK_acb34f60dda89d12956feeedbf4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT "FK_acb34f60dda89d12956feeedbf4" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: channel_member FK_c0e555240770b2a13a82da4db6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT "FK_c0e555240770b2a13a82da4db6e" FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: channel_user FK_d31b165b69b0b23135ce413ce09; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT "FK_d31b165b69b0b23135ce413ce09" FOREIGN KEY (channel_id) REFERENCES public.channels(id);


--
-- Name: direct_messages FK_d8ba1bfebcd2dc2e8a9e2feca5d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d" FOREIGN KEY (user_to_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages FK_fcce42c9a20b120df9a5b672569; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_fcce42c9a20b120df9a5b672569" FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- PostgreSQL database dump complete
--

