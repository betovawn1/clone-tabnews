const { exec } = require("node:child_process");

const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let frameIndex = 0;

function checkPostgres() {
  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search('accepting connections') === -1) {
      const frame = spinner[frameIndex % spinner.length];
      process.stdout.write(`\r${frame} Aguardando o Postgres aceitar conexões`);
      frameIndex++;

      setTimeout(checkPostgres, 200);
      return;
    }
    process.stdout.write('\x1b[2K\r✔ Postgres está pronto e aceitando conexões!\n');
  }
}

checkPostgres();