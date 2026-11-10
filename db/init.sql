CREATE TABLE items (
    detailsId TEXT PRIMARY KEY,
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    category  TEXT NOT NULL,
    image TEXT

);


CREATE TABLE prices (
  item_id     TEXT        NOT NULL REFERENCES items(detailsId),
  league      TEXT        NOT NULL,
  value       NUMERIC     NOT NULL,     
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX prices_latest_idx ON prices (league, item_id, fetched_at DESC);