PGDMP                         y            cowsdb    12.5    12.5 M    j           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            k           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            l           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            m           1262    16415    cowsdb    DATABASE     ?   CREATE DATABASE cowsdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Ecuador.1252' LC_CTYPE = 'Spanish_Ecuador.1252';
    DROP DATABASE cowsdb;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            n           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    17142    cows    TABLE     G  CREATE TABLE public.cows (
    cow_id integer NOT NULL,
    user_id integer,
    cow_name character varying(50) NOT NULL,
    cow_race character varying(20) NOT NULL,
    cow_birth_date date NOT NULL,
    cow_buy_date date NOT NULL,
    cow_price numeric(7,2) NOT NULL,
    cow_description text NOT NULL,
    cow_image text
);
    DROP TABLE public.cows;
       public         heap    postgres    false    3            ?            1259    17140    cows_cow_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.cows_cow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.cows_cow_id_seq;
       public          postgres    false    3    203            o           0    0    cows_cow_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.cows_cow_id_seq OWNED BY public.cows.cow_id;
          public          postgres    false    202            ?            1259    17153    items    TABLE     ?   CREATE TABLE public.items (
    item_id integer NOT NULL,
    purchase_id integer,
    product_id integer,
    item_price numeric(7,2) NOT NULL,
    item_quantity numeric(7,2) NOT NULL,
    item_subtotal numeric(7,2) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false    3            ?            1259    17151    items_item_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.items_item_id_seq;
       public          postgres    false    3    205            p           0    0    items_item_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.items_item_id_seq OWNED BY public.items.item_id;
          public          postgres    false    204            ?            1259    17161    observations    TABLE     ?   CREATE TABLE public.observations (
    observation_id integer NOT NULL,
    type_id integer,
    cow_id integer,
    observation_date date NOT NULL,
    observation_description text NOT NULL,
    observation_price numeric(7,2) NOT NULL
);
     DROP TABLE public.observations;
       public         heap    postgres    false    3            ?            1259    17159    observations_observation_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.observations_observation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.observations_observation_id_seq;
       public          postgres    false    207    3            q           0    0    observations_observation_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.observations_observation_id_seq OWNED BY public.observations.observation_id;
          public          postgres    false    206            ?            1259    17172    payments    TABLE     @  CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    user_id integer NOT NULL,
    payment_date date,
    payment_to_date date,
    payment_from_date date,
    payment_total_liters numeric(7,2),
    payment_liter_value numeric(4,2),
    payment_total numeric(7,2),
    purchase_active boolean NOT NULL
);
    DROP TABLE public.payments;
       public         heap    postgres    false    3            ?            1259    17170    payments_payment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    209    3            r           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    208            ?            1259    17180    products    TABLE     ?   CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_common_price numeric(7,2) NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false    3            ?            1259    17178    products_product_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_product_id_seq;
       public          postgres    false    211    3            s           0    0    products_product_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;
          public          postgres    false    210            ?            1259    17191 	   purchases    TABLE       CREATE TABLE public.purchases (
    purchase_id integer NOT NULL,
    user_id integer NOT NULL,
    purchase_date date NOT NULL,
    purchase_total numeric(7,2) NOT NULL,
    purchase_description text NOT NULL,
    purchase_paid boolean DEFAULT false NOT NULL
);
    DROP TABLE public.purchases;
       public         heap    postgres    false    3            ?            1259    17189    purchases_purchase_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.purchases_purchase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.purchases_purchase_id_seq;
       public          postgres    false    3    213            t           0    0    purchases_purchase_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.purchases_purchase_id_seq OWNED BY public.purchases.purchase_id;
          public          postgres    false    212            ?            1259    17203    records    TABLE     ?   CREATE TABLE public.records (
    record_id integer NOT NULL,
    payment_id integer,
    record_date date NOT NULL,
    record_morning numeric(5,2) NOT NULL,
    record_afternoon numeric(5,2) NOT NULL,
    record_description text NOT NULL
);
    DROP TABLE public.records;
       public         heap    postgres    false    3            ?            1259    17201    records_record_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.records_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.records_record_id_seq;
       public          postgres    false    215    3            u           0    0    records_record_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.records_record_id_seq OWNED BY public.records.record_id;
          public          postgres    false    214            ?            1259    17214    types_observations    TABLE     w   CREATE TABLE public.types_observations (
    type_id integer NOT NULL,
    type_name character varying(20) NOT NULL
);
 &   DROP TABLE public.types_observations;
       public         heap    postgres    false    3            ?            1259    17212    types_observations_type_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.types_observations_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.types_observations_type_id_seq;
       public          postgres    false    217    3            v           0    0    types_observations_type_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.types_observations_type_id_seq OWNED BY public.types_observations.type_id;
          public          postgres    false    216            ?            1259    17222    users    TABLE     ?   CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_email character varying(50) NOT NULL,
    user_name character varying(20) NOT NULL,
    user_password character varying(200) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            ?            1259    17220    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    219    3            w           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    218            ?
           2604    17145    cows cow_id    DEFAULT     j   ALTER TABLE ONLY public.cows ALTER COLUMN cow_id SET DEFAULT nextval('public.cows_cow_id_seq'::regclass);
 :   ALTER TABLE public.cows ALTER COLUMN cow_id DROP DEFAULT;
       public          postgres    false    203    202    203            ?
           2604    17156    items item_id    DEFAULT     n   ALTER TABLE ONLY public.items ALTER COLUMN item_id SET DEFAULT nextval('public.items_item_id_seq'::regclass);
 <   ALTER TABLE public.items ALTER COLUMN item_id DROP DEFAULT;
       public          postgres    false    205    204    205            ?
           2604    17164    observations observation_id    DEFAULT     ?   ALTER TABLE ONLY public.observations ALTER COLUMN observation_id SET DEFAULT nextval('public.observations_observation_id_seq'::regclass);
 J   ALTER TABLE public.observations ALTER COLUMN observation_id DROP DEFAULT;
       public          postgres    false    206    207    207            ?
           2604    17175    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    209    208    209            ?
           2604    17183    products product_id    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    211    210    211            ?
           2604    17194    purchases purchase_id    DEFAULT     ~   ALTER TABLE ONLY public.purchases ALTER COLUMN purchase_id SET DEFAULT nextval('public.purchases_purchase_id_seq'::regclass);
 D   ALTER TABLE public.purchases ALTER COLUMN purchase_id DROP DEFAULT;
       public          postgres    false    213    212    213            ?
           2604    17206    records record_id    DEFAULT     v   ALTER TABLE ONLY public.records ALTER COLUMN record_id SET DEFAULT nextval('public.records_record_id_seq'::regclass);
 @   ALTER TABLE public.records ALTER COLUMN record_id DROP DEFAULT;
       public          postgres    false    214    215    215            ?
           2604    17217    types_observations type_id    DEFAULT     ?   ALTER TABLE ONLY public.types_observations ALTER COLUMN type_id SET DEFAULT nextval('public.types_observations_type_id_seq'::regclass);
 I   ALTER TABLE public.types_observations ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    217    216    217            ?
           2604    17225    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    219    218    219            W          0    17142    cows 
   TABLE DATA           ?   COPY public.cows (cow_id, user_id, cow_name, cow_race, cow_birth_date, cow_buy_date, cow_price, cow_description, cow_image) FROM stdin;
    public          postgres    false    203            Y          0    17153    items 
   TABLE DATA           k   COPY public.items (item_id, purchase_id, product_id, item_price, item_quantity, item_subtotal) FROM stdin;
    public          postgres    false    205            [          0    17161    observations 
   TABLE DATA           ?   COPY public.observations (observation_id, type_id, cow_id, observation_date, observation_description, observation_price) FROM stdin;
    public          postgres    false    207            ]          0    17172    payments 
   TABLE DATA           ?   COPY public.payments (payment_id, user_id, payment_date, payment_to_date, payment_from_date, payment_total_liters, payment_liter_value, payment_total, purchase_active) FROM stdin;
    public          postgres    false    209            _          0    17180    products 
   TABLE DATA           R   COPY public.products (product_id, product_name, product_common_price) FROM stdin;
    public          postgres    false    211            a          0    17191 	   purchases 
   TABLE DATA           }   COPY public.purchases (purchase_id, user_id, purchase_date, purchase_total, purchase_description, purchase_paid) FROM stdin;
    public          postgres    false    213            c          0    17203    records 
   TABLE DATA           {   COPY public.records (record_id, payment_id, record_date, record_morning, record_afternoon, record_description) FROM stdin;
    public          postgres    false    215            e          0    17214    types_observations 
   TABLE DATA           @   COPY public.types_observations (type_id, type_name) FROM stdin;
    public          postgres    false    217            g          0    17222    users 
   TABLE DATA           N   COPY public.users (user_id, user_email, user_name, user_password) FROM stdin;
    public          postgres    false    219            x           0    0    cows_cow_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cows_cow_id_seq', 6, true);
          public          postgres    false    202            y           0    0    items_item_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.items_item_id_seq', 1, false);
          public          postgres    false    204            z           0    0    observations_observation_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.observations_observation_id_seq', 2, true);
          public          postgres    false    206            {           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);
          public          postgres    false    208            |           0    0    products_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_product_id_seq', 3, true);
          public          postgres    false    210            }           0    0    purchases_purchase_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.purchases_purchase_id_seq', 1, false);
          public          postgres    false    212            ~           0    0    records_record_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.records_record_id_seq', 1, false);
          public          postgres    false    214                       0    0    types_observations_type_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.types_observations_type_id_seq', 2, true);
          public          postgres    false    216            ?           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public          postgres    false    218            ?
           2606    17150    cows pk_cows 
   CONSTRAINT     N   ALTER TABLE ONLY public.cows
    ADD CONSTRAINT pk_cows PRIMARY KEY (cow_id);
 6   ALTER TABLE ONLY public.cows DROP CONSTRAINT pk_cows;
       public            postgres    false    203            ?
           2606    17158    items pk_items 
   CONSTRAINT     Q   ALTER TABLE ONLY public.items
    ADD CONSTRAINT pk_items PRIMARY KEY (item_id);
 8   ALTER TABLE ONLY public.items DROP CONSTRAINT pk_items;
       public            postgres    false    205            ?
           2606    17169    observations pk_observations 
   CONSTRAINT     f   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT pk_observations PRIMARY KEY (observation_id);
 F   ALTER TABLE ONLY public.observations DROP CONSTRAINT pk_observations;
       public            postgres    false    207            ?
           2606    17177    payments pk_payments 
   CONSTRAINT     Z   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT pk_payments PRIMARY KEY (payment_id);
 >   ALTER TABLE ONLY public.payments DROP CONSTRAINT pk_payments;
       public            postgres    false    209            ?
           2606    17188    products pk_products 
   CONSTRAINT     Z   ALTER TABLE ONLY public.products
    ADD CONSTRAINT pk_products PRIMARY KEY (product_id);
 >   ALTER TABLE ONLY public.products DROP CONSTRAINT pk_products;
       public            postgres    false    211            ?
           2606    17200    purchases pk_purchases 
   CONSTRAINT     ]   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT pk_purchases PRIMARY KEY (purchase_id);
 @   ALTER TABLE ONLY public.purchases DROP CONSTRAINT pk_purchases;
       public            postgres    false    213            ?
           2606    17211    records pk_records 
   CONSTRAINT     W   ALTER TABLE ONLY public.records
    ADD CONSTRAINT pk_records PRIMARY KEY (record_id);
 <   ALTER TABLE ONLY public.records DROP CONSTRAINT pk_records;
       public            postgres    false    215            ?
           2606    17219 (   types_observations pk_types_observations 
   CONSTRAINT     k   ALTER TABLE ONLY public.types_observations
    ADD CONSTRAINT pk_types_observations PRIMARY KEY (type_id);
 R   ALTER TABLE ONLY public.types_observations DROP CONSTRAINT pk_types_observations;
       public            postgres    false    217            ?
           2606    17227    users pk_users 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public            postgres    false    219            ?
           2606    17228    cows fk_cows_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.cows
    ADD CONSTRAINT fk_cows_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.cows DROP CONSTRAINT fk_cows_reference_users;
       public          postgres    false    2767    203    219            ?
           2606    17233 !   items fk_items_reference_products    FK CONSTRAINT     ?   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_items_reference_products FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_items_reference_products;
       public          postgres    false    205    2759    211            ?
           2606    17238 !   items fk_items_reference_purchase    FK CONSTRAINT     ?   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_items_reference_purchase FOREIGN KEY (purchase_id) REFERENCES public.purchases(purchase_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_items_reference_purchase;
       public          postgres    false    205    2761    213            ?
           2606    17248 '   observations fk_observat_reference_cows    FK CONSTRAINT     ?   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT fk_observat_reference_cows FOREIGN KEY (cow_id) REFERENCES public.cows(cow_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.observations DROP CONSTRAINT fk_observat_reference_cows;
       public          postgres    false    207    203    2751            ?
           2606    17243 +   observations fk_observat_reference_types_ob    FK CONSTRAINT     ?   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT fk_observat_reference_types_ob FOREIGN KEY (type_id) REFERENCES public.types_observations(type_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.observations DROP CONSTRAINT fk_observat_reference_types_ob;
       public          postgres    false    207    2765    217            ?
           2606    17253 $   payments fk_payments_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.payments DROP CONSTRAINT fk_payments_reference_users;
       public          postgres    false    219    2767    209            ?
           2606    17258 %   purchases fk_purchase_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchase_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.purchases DROP CONSTRAINT fk_purchase_reference_users;
       public          postgres    false    219    2767    213            ?
           2606    17263 %   records fk_records_reference_payments    FK CONSTRAINT     ?   ALTER TABLE ONLY public.records
    ADD CONSTRAINT fk_records_reference_payments FOREIGN KEY (payment_id) REFERENCES public.payments(payment_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.records DROP CONSTRAINT fk_records_reference_payments;
       public          postgres    false    2757    209    215            W   ?   x??ϻ
?@?z?+?f7???XA?J????ݰ?B?z??`?????0W??-vm??"?G?"RKT??Z?Xp0??#c?:????m?h??T?P??*?w?=??~ᒅ[???h`?~???/???x~?????Hd??????%??y???v2 ???????7F????7??da      Y      x?????? ? ?      [   T   x?3?4B##C]c]##??T?̼?Ԣ?D?ļ?̤?????|???ĒĔ|???"????+BR?/??41?30?????? ` P      ]      x?????? ? ?      _   ]   x?=?;
?0 ?99EN??8? ]]???V??.Ώg??$Ǣ?f????z]6-?F??t0h?*?J?Ure??'???X??\?B??~??      a      x?????? ? ?      c      x?????? ? ?      e   .   x?3?I?-H-J,)-J?2?t?+)JLITHIUHN??/?????? ???      g   ?   x?]?M??0????????V?xSЈ?	?-??KAi?|[d???fC<?̓?!H?]Y?I+??-?LQdh??#??G/?P?)zgW??xd?R??$C????ڠ`????~????<m??6?????7?????A???U??r?c????3? ?!JԠo?2???\?k??S?????:郫???N??7?N?38?l|?ς?I*|11ƿwca?      M    j           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            k           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            l           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            m           1262    16415    cowsdb    DATABASE     ?   CREATE DATABASE cowsdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Ecuador.1252' LC_CTYPE = 'Spanish_Ecuador.1252';
    DROP DATABASE cowsdb;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            n           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    17142    cows    TABLE     G  CREATE TABLE public.cows (
    cow_id integer NOT NULL,
    user_id integer,
    cow_name character varying(50) NOT NULL,
    cow_race character varying(20) NOT NULL,
    cow_birth_date date NOT NULL,
    cow_buy_date date NOT NULL,
    cow_price numeric(7,2) NOT NULL,
    cow_description text NOT NULL,
    cow_image text
);
    DROP TABLE public.cows;
       public         heap    postgres    false    3            ?            1259    17140    cows_cow_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.cows_cow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.cows_cow_id_seq;
       public          postgres    false    3    203            o           0    0    cows_cow_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.cows_cow_id_seq OWNED BY public.cows.cow_id;
          public          postgres    false    202            ?            1259    17153    items    TABLE     ?   CREATE TABLE public.items (
    item_id integer NOT NULL,
    purchase_id integer,
    product_id integer,
    item_price numeric(7,2) NOT NULL,
    item_quantity numeric(7,2) NOT NULL,
    item_subtotal numeric(7,2) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false    3            ?            1259    17151    items_item_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.items_item_id_seq;
       public          postgres    false    3    205            p           0    0    items_item_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.items_item_id_seq OWNED BY public.items.item_id;
          public          postgres    false    204            ?            1259    17161    observations    TABLE     ?   CREATE TABLE public.observations (
    observation_id integer NOT NULL,
    type_id integer,
    cow_id integer,
    observation_date date NOT NULL,
    observation_description text NOT NULL,
    observation_price numeric(7,2) NOT NULL
);
     DROP TABLE public.observations;
       public         heap    postgres    false    3            ?            1259    17159    observations_observation_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.observations_observation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.observations_observation_id_seq;
       public          postgres    false    207    3            q           0    0    observations_observation_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.observations_observation_id_seq OWNED BY public.observations.observation_id;
          public          postgres    false    206            ?            1259    17172    payments    TABLE     @  CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    user_id integer NOT NULL,
    payment_date date,
    payment_to_date date,
    payment_from_date date,
    payment_total_liters numeric(7,2),
    payment_liter_value numeric(4,2),
    payment_total numeric(7,2),
    purchase_active boolean NOT NULL
);
    DROP TABLE public.payments;
       public         heap    postgres    false    3            ?            1259    17170    payments_payment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    209    3            r           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    208            ?            1259    17180    products    TABLE     ?   CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_common_price numeric(7,2) NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false    3            ?            1259    17178    products_product_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_product_id_seq;
       public          postgres    false    211    3            s           0    0    products_product_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;
          public          postgres    false    210            ?            1259    17191 	   purchases    TABLE       CREATE TABLE public.purchases (
    purchase_id integer NOT NULL,
    user_id integer NOT NULL,
    purchase_date date NOT NULL,
    purchase_total numeric(7,2) NOT NULL,
    purchase_description text NOT NULL,
    purchase_paid boolean DEFAULT false NOT NULL
);
    DROP TABLE public.purchases;
       public         heap    postgres    false    3            ?            1259    17189    purchases_purchase_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.purchases_purchase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.purchases_purchase_id_seq;
       public          postgres    false    3    213            t           0    0    purchases_purchase_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.purchases_purchase_id_seq OWNED BY public.purchases.purchase_id;
          public          postgres    false    212            ?            1259    17203    records    TABLE     ?   CREATE TABLE public.records (
    record_id integer NOT NULL,
    payment_id integer,
    record_date date NOT NULL,
    record_morning numeric(5,2) NOT NULL,
    record_afternoon numeric(5,2) NOT NULL,
    record_description text NOT NULL
);
    DROP TABLE public.records;
       public         heap    postgres    false    3            ?            1259    17201    records_record_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.records_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.records_record_id_seq;
       public          postgres    false    215    3            u           0    0    records_record_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.records_record_id_seq OWNED BY public.records.record_id;
          public          postgres    false    214            ?            1259    17214    types_observations    TABLE     w   CREATE TABLE public.types_observations (
    type_id integer NOT NULL,
    type_name character varying(20) NOT NULL
);
 &   DROP TABLE public.types_observations;
       public         heap    postgres    false    3            ?            1259    17212    types_observations_type_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.types_observations_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.types_observations_type_id_seq;
       public          postgres    false    217    3            v           0    0    types_observations_type_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.types_observations_type_id_seq OWNED BY public.types_observations.type_id;
          public          postgres    false    216            ?            1259    17222    users    TABLE     ?   CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_email character varying(50) NOT NULL,
    user_name character varying(20) NOT NULL,
    user_password character varying(200) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            ?            1259    17220    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    219    3            w           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    218            ?
           2604    17145    cows cow_id    DEFAULT     j   ALTER TABLE ONLY public.cows ALTER COLUMN cow_id SET DEFAULT nextval('public.cows_cow_id_seq'::regclass);
 :   ALTER TABLE public.cows ALTER COLUMN cow_id DROP DEFAULT;
       public          postgres    false    203    202    203            ?
           2604    17156    items item_id    DEFAULT     n   ALTER TABLE ONLY public.items ALTER COLUMN item_id SET DEFAULT nextval('public.items_item_id_seq'::regclass);
 <   ALTER TABLE public.items ALTER COLUMN item_id DROP DEFAULT;
       public          postgres    false    205    204    205            ?
           2604    17164    observations observation_id    DEFAULT     ?   ALTER TABLE ONLY public.observations ALTER COLUMN observation_id SET DEFAULT nextval('public.observations_observation_id_seq'::regclass);
 J   ALTER TABLE public.observations ALTER COLUMN observation_id DROP DEFAULT;
       public          postgres    false    206    207    207            ?
           2604    17175    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    209    208    209            ?
           2604    17183    products product_id    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    211    210    211            ?
           2604    17194    purchases purchase_id    DEFAULT     ~   ALTER TABLE ONLY public.purchases ALTER COLUMN purchase_id SET DEFAULT nextval('public.purchases_purchase_id_seq'::regclass);
 D   ALTER TABLE public.purchases ALTER COLUMN purchase_id DROP DEFAULT;
       public          postgres    false    213    212    213            ?
           2604    17206    records record_id    DEFAULT     v   ALTER TABLE ONLY public.records ALTER COLUMN record_id SET DEFAULT nextval('public.records_record_id_seq'::regclass);
 @   ALTER TABLE public.records ALTER COLUMN record_id DROP DEFAULT;
       public          postgres    false    214    215    215            ?
           2604    17217    types_observations type_id    DEFAULT     ?   ALTER TABLE ONLY public.types_observations ALTER COLUMN type_id SET DEFAULT nextval('public.types_observations_type_id_seq'::regclass);
 I   ALTER TABLE public.types_observations ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    217    216    217            ?
           2604    17225    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    219    218    219            W          0    17142    cows 
   TABLE DATA           ?   COPY public.cows (cow_id, user_id, cow_name, cow_race, cow_birth_date, cow_buy_date, cow_price, cow_description, cow_image) FROM stdin;
    public          postgres    false    203   g       Y          0    17153    items 
   TABLE DATA           k   COPY public.items (item_id, purchase_id, product_id, item_price, item_quantity, item_subtotal) FROM stdin;
    public          postgres    false    205   ?        [          0    17161    observations 
   TABLE DATA           ?   COPY public.observations (observation_id, type_id, cow_id, observation_date, observation_description, observation_price) FROM stdin;
    public          postgres    false    207           ]          0    17172    payments 
   TABLE DATA           ?   COPY public.payments (payment_id, user_id, payment_date, payment_to_date, payment_from_date, payment_total_liters, payment_liter_value, payment_total, purchase_active) FROM stdin;
    public          postgres    false    209   ^        _          0    17180    products 
   TABLE DATA           R   COPY public.products (product_id, product_name, product_common_price) FROM stdin;
    public          postgres    false    211           a          0    17191 	   purchases 
   TABLE DATA           }   COPY public.purchases (purchase_id, user_id, purchase_date, purchase_total, purchase_description, purchase_paid) FROM stdin;
    public          postgres    false    213   g        c          0    17203    records 
   TABLE DATA           {   COPY public.records (record_id, payment_id, record_date, record_morning, record_afternoon, record_description) FROM stdin;
    public          postgres    false    215           e          0    17214    types_observations 
   TABLE DATA           @   COPY public.types_observations (type_id, type_name) FROM stdin;
    public          postgres    false    217           g          0    17222    users 
   TABLE DATA           N   COPY public.users (user_id, user_email, user_name, user_password) FROM stdin;
    public          postgres    false    219   8        x           0    0    cows_cow_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cows_cow_id_seq', 6, true);
          public          postgres    false    202            y           0    0    items_item_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.items_item_id_seq', 1, false);
          public          postgres    false    204            z           0    0    observations_observation_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.observations_observation_id_seq', 2, true);
          public          postgres    false    206            {           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);
          public          postgres    false    208            |           0    0    products_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_product_id_seq', 3, true);
          public          postgres    false    210            }           0    0    purchases_purchase_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.purchases_purchase_id_seq', 1, false);
          public          postgres    false    212            ~           0    0    records_record_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.records_record_id_seq', 1, false);
          public          postgres    false    214                       0    0    types_observations_type_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.types_observations_type_id_seq', 2, true);
          public          postgres    false    216            ?           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public          postgres    false    218            ?
           2606    17150    cows pk_cows 
   CONSTRAINT     N   ALTER TABLE ONLY public.cows
    ADD CONSTRAINT pk_cows PRIMARY KEY (cow_id);
 6   ALTER TABLE ONLY public.cows DROP CONSTRAINT pk_cows;
       public            postgres    false    203            ?
           2606    17158    items pk_items 
   CONSTRAINT     Q   ALTER TABLE ONLY public.items
    ADD CONSTRAINT pk_items PRIMARY KEY (item_id);
 8   ALTER TABLE ONLY public.items DROP CONSTRAINT pk_items;
       public            postgres    false    205            ?
           2606    17169    observations pk_observations 
   CONSTRAINT     f   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT pk_observations PRIMARY KEY (observation_id);
 F   ALTER TABLE ONLY public.observations DROP CONSTRAINT pk_observations;
       public            postgres    false    207            ?
           2606    17177    payments pk_payments 
   CONSTRAINT     Z   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT pk_payments PRIMARY KEY (payment_id);
 >   ALTER TABLE ONLY public.payments DROP CONSTRAINT pk_payments;
       public            postgres    false    209            ?
           2606    17188    products pk_products 
   CONSTRAINT     Z   ALTER TABLE ONLY public.products
    ADD CONSTRAINT pk_products PRIMARY KEY (product_id);
 >   ALTER TABLE ONLY public.products DROP CONSTRAINT pk_products;
       public            postgres    false    211            ?
           2606    17200    purchases pk_purchases 
   CONSTRAINT     ]   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT pk_purchases PRIMARY KEY (purchase_id);
 @   ALTER TABLE ONLY public.purchases DROP CONSTRAINT pk_purchases;
       public            postgres    false    213            ?
           2606    17211    records pk_records 
   CONSTRAINT     W   ALTER TABLE ONLY public.records
    ADD CONSTRAINT pk_records PRIMARY KEY (record_id);
 <   ALTER TABLE ONLY public.records DROP CONSTRAINT pk_records;
       public            postgres    false    215            ?
           2606    17219 (   types_observations pk_types_observations 
   CONSTRAINT     k   ALTER TABLE ONLY public.types_observations
    ADD CONSTRAINT pk_types_observations PRIMARY KEY (type_id);
 R   ALTER TABLE ONLY public.types_observations DROP CONSTRAINT pk_types_observations;
       public            postgres    false    217            ?
           2606    17227    users pk_users 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public            postgres    false    219            ?
           2606    17228    cows fk_cows_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.cows
    ADD CONSTRAINT fk_cows_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.cows DROP CONSTRAINT fk_cows_reference_users;
       public          postgres    false    2767    203    219            ?
           2606    17233 !   items fk_items_reference_products    FK CONSTRAINT     ?   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_items_reference_products FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_items_reference_products;
       public          postgres    false    205    2759    211            ?
           2606    17238 !   items fk_items_reference_purchase    FK CONSTRAINT     ?   ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_items_reference_purchase FOREIGN KEY (purchase_id) REFERENCES public.purchases(purchase_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.items DROP CONSTRAINT fk_items_reference_purchase;
       public          postgres    false    205    2761    213            ?
           2606    17248 '   observations fk_observat_reference_cows    FK CONSTRAINT     ?   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT fk_observat_reference_cows FOREIGN KEY (cow_id) REFERENCES public.cows(cow_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.observations DROP CONSTRAINT fk_observat_reference_cows;
       public          postgres    false    207    203    2751            ?
           2606    17243 +   observations fk_observat_reference_types_ob    FK CONSTRAINT     ?   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT fk_observat_reference_types_ob FOREIGN KEY (type_id) REFERENCES public.types_observations(type_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.observations DROP CONSTRAINT fk_observat_reference_types_ob;
       public          postgres    false    207    2765    217            ?
           2606    17253 $   payments fk_payments_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.payments DROP CONSTRAINT fk_payments_reference_users;
       public          postgres    false    219    2767    209            ?
           2606    17258 %   purchases fk_purchase_reference_users    FK CONSTRAINT     ?   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchase_reference_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.purchases DROP CONSTRAINT fk_purchase_reference_users;
       public          postgres    false    219    2767    213            ?
           2606    17263 %   records fk_records_reference_payments    FK CONSTRAINT     ?   ALTER TABLE ONLY public.records
    ADD CONSTRAINT fk_records_reference_payments FOREIGN KEY (payment_id) REFERENCES public.payments(payment_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public.records DROP CONSTRAINT fk_records_reference_payments;
       public          postgres    false    2757    209    215           