CREATE TABLE items (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  category  TEXT NOT NULL,
  image     TEXT
);

CREATE TABLE prices (
  item_id     TEXT        NOT NULL REFERENCES items(id),
  league      TEXT        NOT NULL,
  value       NUMERIC     NOT NULL,
  currency    TEXT        NOT NULL,
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX prices_latest_idx ON prices (league, item_id, fetched_at DESC);