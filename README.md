# lwollama

lwollama is a dockerized web application that is intended to run on your local machine to perform inference against Llama 3.1.

## To start
You should probably have [Deno](https://deno.com) install first. `curl -fsSL https://deno.land/install.sh | sh`

```bash
git clone https://github.com/WingZer0o/wollama.git
cd docker-scripts/
./build-and-start-container.sh
```
Navigate to `http://localhost:4200` to view the UI.
