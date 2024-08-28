--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Experiment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Experiment" (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "paperId" text NOT NULL
);


ALTER TABLE public."Experiment" OWNER TO postgres;

--
-- Name: ExperimentItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExperimentItem" (
    id text NOT NULL,
    material text,
    supplier text,
    usage text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "experimentId" text NOT NULL
);


ALTER TABLE public."ExperimentItem" OWNER TO postgres;

--
-- Name: Instruction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Instruction" (
    id text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "experimentId" text NOT NULL
);


ALTER TABLE public."Instruction" OWNER TO postgres;

--
-- Name: Methodology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Methodology" (
    id text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "experimentId" text NOT NULL
);


ALTER TABLE public."Methodology" OWNER TO postgres;

--
-- Name: Paper; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Paper" (
    id text NOT NULL,
    title text NOT NULL,
    authors text[],
    tags text[],
    "pubmedId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Paper" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    hash text NOT NULL,
    username text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Experiment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Experiment" (id, title, "createdAt", "updatedAt", "paperId") FROM stdin;
\.


--
-- Data for Name: ExperimentItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExperimentItem" (id, material, supplier, usage, "createdAt", "updatedAt", "experimentId") FROM stdin;
\.


--
-- Data for Name: Instruction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Instruction" (id, text, "createdAt", "updatedAt", "experimentId") FROM stdin;
\.


--
-- Data for Name: Methodology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Methodology" (id, text, "createdAt", "updatedAt", "experimentId") FROM stdin;
\.


--
-- Data for Name: Paper; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Paper" (id, title, authors, tags, "pubmedId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, hash, username, role, "createdAt", "updatedAt") FROM stdin;
2996cb35-5ef7-4290-bf7d-6d50b9dfc1c3	$argon2id$v=19$m=65536,t=3,p=4$3wCmJ9dJaNLBQbSqa0LaYg$M/7S/RTJq5M/6BkiFHswL7R+J+i05KYJw+KnnaEex64	admin	ADMIN	2024-08-26 16:11:41.813	2024-08-26 16:11:41.813
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ffd91755-05bc-4f96-817d-e210ec411b56	f82f802d4767f394af772174fcc12b6ce5b41c9d35d2c918f38271f104b2e0d0	2024-08-26 16:09:52.191481+00	20240826160952_	\N	\N	2024-08-26 16:09:52.156818+00	1
\.


--
-- Name: ExperimentItem ExperimentItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExperimentItem"
    ADD CONSTRAINT "ExperimentItem_pkey" PRIMARY KEY (id);


--
-- Name: Experiment Experiment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Experiment"
    ADD CONSTRAINT "Experiment_pkey" PRIMARY KEY (id);


--
-- Name: Instruction Instruction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Instruction"
    ADD CONSTRAINT "Instruction_pkey" PRIMARY KEY (id);


--
-- Name: Methodology Methodology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Methodology"
    ADD CONSTRAINT "Methodology_pkey" PRIMARY KEY (id);


--
-- Name: Paper Paper_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Paper"
    ADD CONSTRAINT "Paper_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: ExperimentItem ExperimentItem_experimentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExperimentItem"
    ADD CONSTRAINT "ExperimentItem_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES public."Experiment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Experiment Experiment_paperId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Experiment"
    ADD CONSTRAINT "Experiment_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES public."Paper"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Instruction Instruction_experimentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Instruction"
    ADD CONSTRAINT "Instruction_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES public."Experiment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Methodology Methodology_experimentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Methodology"
    ADD CONSTRAINT "Methodology_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES public."Experiment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

