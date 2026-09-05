#!/usr/bin/env bash
# DEVELOPMENT ONLY — run the site with both intake forms wired to the local receiver.
#
# Starts tools/dev-intake-receiver.mjs on loopback, then `next dev` with the
# receiver's self-signed certificate added as a trusted CA. Certificate
# verification stays enabled; NODE_TLS_REJECT_UNAUTHORIZED is never touched.
#
# Usage: ./tools/dev-with-local-intake.sh [next-dev-args...]
set -euo pipefail

DATA_DIR="${DEV_RECEIVER_DATA_DIR:-/mnt/storage/insureme-dev-data}"
PORT="${DEV_RECEIVER_PORT:-4000}"
CERT="$DATA_DIR/dev-cert.pem"
KEY="$DATA_DIR/dev-key.pem"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$CERT" ] || [ ! -f "$KEY" ]; then
  echo "Generating a loopback certificate for the dev receiver in $DATA_DIR"
  mkdir -p "$DATA_DIR"
  openssl req -x509 -newkey rsa:2048 -sha256 -days 365 -nodes \
    -keyout "$KEY" -out "$CERT" \
    -subj "/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
    -addext "basicConstraints=critical,CA:TRUE" 2>/dev/null
  chmod 600 "$KEY"
fi

RECEIVER_PID=""
cleanup() {
  [ -n "$RECEIVER_PID" ] && kill "$RECEIVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

node "$ROOT/tools/dev-intake-receiver.mjs" --port "$PORT" --data-dir "$DATA_DIR" &
RECEIVER_PID=$!
sleep 1

export NODE_EXTRA_CA_CERTS="$CERT"
echo
echo "Receiver PID $RECEIVER_PID — submissions land in $DATA_DIR"
echo "Inspect: curl --cacert $CERT https://127.0.0.1:$PORT/_dev/assessments"
echo
cd "$ROOT"
exec npx next dev "$@"
